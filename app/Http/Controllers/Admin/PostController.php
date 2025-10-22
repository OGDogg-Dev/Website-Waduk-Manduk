<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Content\Services\MediaLibrary;
use App\Enums\ContentStatus;
use App\Http\Requests\Admin\Post\PostStoreRequest;
use App\Http\Requests\Admin\Post\PostUpdateRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Response;

class PostController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status']);

        $posts = Post::query()
            ->with(['author:id,name', 'coverMedia'])
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->latest('published_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/Posts/Index', [
            'filters' => $filters,
            'collection' => $posts->through(function (Post $post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'status' => $post->status->value,
                    'published_at' => optional($post->published_at)->toIso8601String(),
                    'author' => $post->author?->name,
                    'cover' => $post->coverMedia?->url,
                    'updated_at' => optional($post->updated_at)->toIso8601String(),
                ];
            }),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/Posts/Form', [
            'post' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(PostStoreRequest $request): RedirectResponse
    {
        $payload = $request->validatedPayload();
        $payload['created_by'] = $request->user()?->id;
        $payload['updated_by'] = $request->user()?->id;
        $payload['published_at'] = $this->determinePublicationTimestamp($payload['status'], $payload['published_at']);

        if ($request->hasFile('cover_image')) {
            $media = MediaLibrary::storeUpload(
                $request->file('cover_image'),
                $request->user(),
                'images/posts/cover',
                'public',
                ['alt_text' => $payload['title']]
            );

            $payload['cover_media_id'] = $media->getKey();
        }

        Post::query()->create($payload);

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Artikel berhasil dibuat.');
    }

    public function show(Post $post): Response
    {
        $post->load(['author:id,name', 'editor:id,name', 'coverMedia']);

        return $this->inertia()->render('Admin/Posts/Show', [
            'post' => $post->toArray(),
        ]);
    }

    public function edit(Post $post): Response
    {
        $post->load(['coverMedia']);

        return $this->inertia()->render('Admin/Posts/Form', [
            'post' => $post->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(PostUpdateRequest $request, Post $post): RedirectResponse
    {
        $payload = $request->validatedPayload();
        $payload['updated_by'] = $request->user()?->id;
        $payload['published_at'] = $this->determinePublicationTimestamp($payload['status'], $payload['published_at']);

        if ($request->hasFile('cover_image')) {
            if ($post->coverMedia) {
                MediaLibrary::delete($post->coverMedia);
            }

            $media = MediaLibrary::storeUpload(
                $request->file('cover_image'),
                $request->user(),
                'images/posts/cover',
                'public',
                ['alt_text' => $payload['title']]
            );

            $payload['cover_media_id'] = $media->getKey();
        }

        $post->update($payload);

        return redirect()
            ->route('admin.posts.edit', $post)
            ->with('success', 'Artikel berhasil diperbarui.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        if ($post->coverMedia) {
            MediaLibrary::delete($post->coverMedia);
        }

        $post->delete();

        return redirect()
            ->route('admin.posts.index')
            ->with('success', 'Artikel berhasil dihapus.');
    }

    private function formOptions(): array
    {
        $status = collect(ContentStatus::cases())
            ->reject(fn (ContentStatus $status) => $status === ContentStatus::ARCHIVED)
            ->map(fn (ContentStatus $status) => [
                'value' => $status->value,
                'label' => ucfirst($status->value),
            ])
            ->values()
            ->all();

        return [
            'status' => $status,
        ];
    }

    private function determinePublicationTimestamp(string $status, $publishedAt): ?Carbon
    {
        $statusEnum = ContentStatus::from($status);

        if ($statusEnum !== ContentStatus::PUBLISHED) {
            return null;
        }

        if ($publishedAt instanceof Carbon) {
            return $publishedAt;
        }

        if (is_string($publishedAt) && $publishedAt !== '') {
            return Carbon::parse($publishedAt);
        }

        return Carbon::now();
    }
}
