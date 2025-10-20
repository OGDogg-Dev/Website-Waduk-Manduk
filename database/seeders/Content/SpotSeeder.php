<?php

namespace Database\Seeders\Content;

use App\Enums\ContentStatus;
use App\Models\Spot;
use Illuminate\Database\Seeder;

class SpotSeeder extends Seeder
{
    public function run(): void
    {
        $spots = [
            [
                'name' => 'Gerbang Utama Waduk Manduk',
                'type' => 'entrance',
                'category' => 'akses',
                'headline' => 'Pintu masuk utama dengan pos informasi dan area parkir',
                'description' => 'Titik awal kunjungan dengan papan informasi jalur, toilet dasar, dan pos jaga komunitas.',
                'tips' => 'Datang lebih pagi di akhir pekan untuk menghindari antrean.',
                'latitude' => -7.3265123,
                'longitude' => 111.5887641,
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => true,
                'sort_order' => 1,
                'hero_image' => '/images/spots/gerbang-utama.jpg',
            ],
            [
                'name' => 'Titian Pandang Bukit Cemara',
                'type' => 'viewpoint',
                'category' => 'panorama',
                'headline' => 'Panorama 270° waduk dan lanskap perbukitan',
                'description' => 'Titian kayu yang dibangun swadaya warga dengan spot foto dan papan edukasi mengenai sejarah waduk.',
                'tips' => 'Gunakan alas kaki anti selip karena embun pagi bisa membuat licin.',
                'latitude' => -7.3249812,
                'longitude' => 111.5901255,
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => true,
                'sort_order' => 2,
                'hero_image' => '/images/spots/titian-pandang.jpg',
            ],
            [
                'name' => 'Jalur Interpretasi Rawa',
                'type' => 'trail',
                'category' => 'edukasi',
                'headline' => 'Jalur edukasi pendek dengan papan flora-fauna',
                'description' => 'Jalur lajur kayu sepanjang 600 meter melintasi area rawa yang menjadi habitat burung air.',
                'tips' => 'Tutup botol minuman rapat dan jangan memberi makan satwa liar.',
                'latitude' => -7.327425,
                'longitude' => 111.589332,
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => false,
                'sort_order' => 3,
                'hero_image' => '/images/spots/jalur-interpretasi.jpg',
            ],
        ];

        foreach ($spots as $position => $attributes) {
            $slug = $attributes['slug'] ?? str($attributes['name'])->slug();
            $metadata = $attributes['metadata'] ?? [];

            $metadata['icon'] ??= match ($attributes['type']) {
                'viewpoint' => 'mdi:binoculars',
                'trail' => 'mdi:map-marker-path',
                'entrance' => 'mdi:gate',
                default => 'mdi:map-marker',
            };

            Spot::query()->updateOrCreate(
                ['slug' => $slug],
                array_merge($attributes, [
                    'slug' => $slug,
                    'sort_order' => $attributes['sort_order'] ?? ($position + 1),
                    'metadata' => $metadata,
                ])
            );
        }
    }
}
