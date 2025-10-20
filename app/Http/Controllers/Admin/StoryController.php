<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Enums\StoryType;
use App\Http\Requests\Admin\Story\StoryStoreRequest;
use App\Http\Requests\Admin\Story\StoryUpdateRequest;
use App\Models\Story;
use App\Services\MediaUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class StoryController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'type']);

        $stories = Story::query()
            ->with(['author:id,name'])
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('type', $type))
            ->latest('published_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/Stories/Index', [
            'filters' => $filters,
            'collection' => $stories->through(
                fn (Story $story) => [
                    'id' => $story->id,
                    'title' => $story->title,
                    'status' => $story->status->value,
                    'type' => $story->type->value,
                    'published_at' => optional($story->published_at)->toIso8601String(),
                    'author' => $story->author?->name,
                    'updated_at' => optional($story->updated_at)->toIso8601String(),
                ]
            ),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/Stories/Form', [
            'story' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(StoryStoreRequest $request): RedirectResponse
    {
        Log::info('story:store:received', [
            'has_hero' => $request->hasFile('hero_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $payload = $request->validatedPayload();
        unset($payload['existing_gallery']);
        $payload['tags'] = $request->input('tags', []);
        $payload['metadata'] = $request->input('metadata', []);
        $payload['author_id'] = $request->user()?->id;
        $payload['reviewed_by'] = $request->user()?->id;

        if ($hero = MediaUploader::store($request->file('hero_image'), 'images/stories/hero')) {
            $payload['hero_image'] = $hero;
        }

        $payload['gallery'] = MediaUploader::storeMany($request->file('gallery'), 'images/stories/gallery');

        Story::query()->create($payload);

        return redirect()
            ->route('admin.stories.index')
            ->with('success', 'Cerita berhasil dibuat.');
    }

    public function show(Story $story): Response
    {
        $story->load(['author:id,name', 'reviewer:id,name']);

        return $this->inertia()->render('Admin/Stories/Show', [
            'story' => $story->toArray(),
        ]);
    }

    public function edit(Story $story): Response
    {
        return $this->inertia()->render('Admin/Stories/Form', [
            'story' => $story->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(StoryUpdateRequest $request, Story $story): RedirectResponse
    {
        Log::info('story:update:received', [
            'story_id' => $story->getKey(),
            'has_hero' => $request->hasFile('hero_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $payload = $request->validatedPayload();
        $existingGallery = Arr::pull($payload, 'existing_gallery', []);
        $payload['tags'] = $request->input('tags', []);
        $payload['metadata'] = $request->input('metadata', []);

        if ($request->hasFile('hero_image')) {
            MediaUploader::delete($story->hero_image);
            $payload['hero_image'] = MediaUploader::store($request->file('hero_image'), 'images/stories/hero');
        }

        $newGallery = MediaUploader::storeMany($request->file('gallery'), 'images/stories/gallery');
        $payload['gallery'] = array_values(array_merge($existingGallery, $newGallery));

        if (
            ($payload['status'] ?? $story->status->value) === ContentStatus::PUBLISHED->value
            && ! $story->reviewed_by
        ) {
            $payload['reviewed_by'] = $request->user()?->id;
        }

        $story->update($payload);

        return redirect()
            ->route('admin.stories.edit', $story)
            ->with('success', 'Cerita berhasil diperbarui.');
    }

    public function destroy(Story $story): RedirectResponse
    {
        $story->delete();

        return redirect()
            ->route('admin.stories.index')
            ->with('success', 'Cerita berhasil dihapus.');
    }

    private function formOptions(): array
    {
        return [
            'status' => collect(ContentStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => ucfirst($status->value),
            ])->values()->all(),
            'types' => collect(StoryType::cases())->map(fn ($type) => [
                'value' => $type->value,
                'label' => $type->label(),
            ])->values()->all(),
        ];
    }
}
