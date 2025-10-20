<?php

namespace Database\Seeders\Core;

use App\Models\HomepageSetting;
use Illuminate\Database\Seeder;

class HomepageSeeder extends Seeder
{
    public function run(): void
    {
        HomepageSetting::query()->firstOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Ekowisata Waduk Manduk',
                'hero_subtitle' => 'Menjaga alam, menguatkan komunitas. Informasi lengkap untuk merencanakan kunjungan, mendukung UMKM, dan mengikuti kegiatan konservasi.',
                'hero_background' => null,
                'cta_primary_label' => 'Rencanakan kunjungan',
                'cta_primary_url' => '/rencanakan-kunjungan',
                'cta_secondary_label' => 'Cerita terbaru',
                'cta_secondary_url' => '/cerita',
                'highlights' => [
                    'stats' => [
                        'spots' => 0,
                        'umkm' => 0,
                        'events' => 0,
                    ],
                ],
            ]
        );
    }
}

