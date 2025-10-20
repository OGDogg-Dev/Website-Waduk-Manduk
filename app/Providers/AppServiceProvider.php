<?php

namespace App\Providers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $directories = [
            'images/spots/hero',
            'images/spots/gallery',
            'images/events/cover',
            'images/events/gallery',
            'images/umkm/hero',
            'images/umkm/gallery',
            'images/stories/hero',
            'images/stories/gallery',
        ];

        $disk = Storage::disk('public');

        foreach ($directories as $directory) {
            if (method_exists($disk, 'directoryExists')) {
                if (! $disk->directoryExists($directory)) {
                    $disk->makeDirectory($directory);
                }
            } elseif (! $disk->exists($directory)) {
                $disk->makeDirectory($directory);
            }
        }
    }
}
