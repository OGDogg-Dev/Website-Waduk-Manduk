<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaUploader
{
    public static function store(?UploadedFile $file, string $directory): ?string
    {
        if (! $file instanceof UploadedFile) {
            return null;
        }

        static::ensureDirectoryExists($directory);

        $path = $file->store($directory, 'public');
        Log::info('media-upload:stored', [
            'directory' => $directory,
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
        ]);

        return $path;
    }

    /**
     * @param  array<int, UploadedFile|null>|null  $files
     * @param  string  $directory
     * @return array<int, string>
     */
    public static function storeMany(?array $files, string $directory): array
    {
        if (empty($files)) {
            return [];
        }

        static::ensureDirectoryExists($directory);

        $stored = Arr::map(
            array_filter($files, fn ($file) => $file instanceof UploadedFile),
            function (UploadedFile $file) use ($directory) {
                $path = $file->store($directory, 'public');
                Log::info('media-upload:stored', [
                    'directory' => $directory,
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                ]);

                return $path;
            }
        );

        return $stored;
    }

    public static function delete(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }

    protected static function ensureDirectoryExists(string $directory): void
    {
        $disk = Storage::disk('public');

        if (method_exists($disk, 'directoryExists')) {
            if (! $disk->directoryExists($directory)) {
                $disk->makeDirectory($directory);
            }
        } elseif (! $disk->exists($directory)) {
            $disk->makeDirectory($directory);
        }
    }
}
