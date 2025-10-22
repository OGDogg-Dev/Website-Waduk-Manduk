<?php

namespace App\Http\Controllers\Admin;

use App\Domain\Content\Services\MediaLibrary;
use App\Http\Requests\Admin\Media\MediaStoreRequest;
use App\Http\Requests\Admin\Media\MediaUpdateRequest;
use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class MediaController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'collection']);

        $mediaItems = Media::query()
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('caption', 'like', "%{$search}%")
                        ->orWhere('alt_text', 'like', "%{$search}%");
                });
            })
            ->when($filters['collection'] ?? null, fn ($query, $collection) => $query->where('collection', $collection))
            ->latest()
            ->paginate(24)
            ->withQueryString();

        $collections = Media::query()
            ->select('collection')
            ->whereNotNull('collection')
            ->distinct()
            ->orderBy('collection')
            ->pluck('collection')
            ->map(fn ($collection) => ['value' => $collection, 'label' => $collection])
            ->values()
            ->all();

        return $this->inertia()->render('Admin/Media/Index', [
            'filters' => $filters,
            'collection' => $mediaItems->through(fn (Media $media) => [
                'id' => $media->id,
                'url' => $media->url,
                'caption' => $media->caption,
                'alt_text' => $media->alt_text,
                'mime' => $media->mime,
                'size' => $media->size,
                'collection' => $media->collection,
                'created_at' => optional($media->created_at)->toIso8601String(),
            ]),
            'options' => [
                'collections' => $collections,
            ],
        ]);
    }

    public function store(MediaStoreRequest $request): RedirectResponse
    {
        $payload = $request->validatedPayload();
        $file = $request->file('file');

        $media = MediaLibrary::storeUpload(
            $file,
            $request->user(),
            $payload['collection'],
            'public',
            [
                'alt_text' => $payload['alt_text'],
                'caption' => $payload['caption'],
            ]
        );

        return redirect()
            ->route('admin.media.index')
            ->with('success', 'Media berhasil diunggah.')
            ->with('media_id', $media->getKey());
    }

    public function update(MediaUpdateRequest $request, Media $media): RedirectResponse
    {
        $media->update($request->validated());

        return redirect()
            ->route('admin.media.index')
            ->with('success', 'Informasi media berhasil diperbarui.');
    }

    public function destroy(Media $media): RedirectResponse
    {
        MediaLibrary::delete($media);

        return redirect()
            ->route('admin.media.index')
            ->with('success', 'Media berhasil dihapus.');
    }
}
