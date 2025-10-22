<?php

namespace App\Domain\Content\Services;

use App\Domain\Content\Models\Media;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaLibrary
{
    /**
     * @param  array<string, mixed>  $attributes
     */
    public static function storeUpload(UploadedFile $file, ?User $creator = null, ?string $collection = null, ?string $disk = null, array $attributes = []): Media
    {
        $disk = $disk ?: config('filesystems.default', 'public');
        $path = $file->store($collection ?: 'uploads', $disk);

        Log::info('media-library:stored', [
            'disk' => $disk,
            'path' => $path,
            'collection' => $collection,
            'mime' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

        return Media::query()->create(array_merge([
            'disk' => $disk,
            'path' => $path,
            'collection' => $collection,
            'mime' => $file->getClientMimeType(),
            'size' => $file->getSize() ?? 0,
            'created_by' => $creator?->getKey(),
        ], $attributes));
    }

    public static function delete(Media $media): void
    {
        $disk = $media->disk;
        $path = $media->path;

        if ($path && Storage::disk($disk)->exists($path)) {
            Storage::disk($disk)->delete($path);
        }

        $media->delete();
    }
}
