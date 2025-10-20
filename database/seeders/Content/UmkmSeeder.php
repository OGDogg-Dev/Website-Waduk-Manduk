<?php

namespace Database\Seeders\Content;

use App\Enums\ContentStatus;
use App\Models\Umkm;
use Illuminate\Database\Seeder;

class UmkmSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Warung Ibu Siti',
                'category' => 'kuliner',
                'tagline' => 'Nasi pecel dan wedang uwuh favorit pengunjung',
                'description' => 'Warung sederhana dengan menu khas desa, menggunakan bahan lokal hasil kebun sekitar waduk.',
                'whatsapp_number' => '6281234567890',
                'maps_url' => 'https://maps.app.goo.gl/warungibusiti',
                'instagram_url' => 'https://instagram.com/warungibusiti',
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => true,
                'opening_hours' => [
                    'weekday' => '07:00-17:00',
                    'weekend' => '06:00-18:00',
                ],
                'products' => [
                    ['name' => 'Nasi Pecel Manduk', 'price' => 'Rp12.000'],
                    ['name' => 'Wedang Uwuh', 'price' => 'Rp6.000'],
                ],
                'address' => 'Deret kios UMKM, sisi timur waduk',
                'hero_image' => '/images/umkm/warung-ibu-siti.jpg',
            ],
            [
                'name' => 'Kopi Lereng Manduk',
                'category' => 'minuman',
                'tagline' => 'Seduhan kopi robusta lereng Manduk',
                'description' => 'Kios mini yang menawarkan kopi seduh manual dan edukasi singkat tentang budidaya kopi.',
                'whatsapp_number' => '6289876543210',
                'maps_url' => 'https://maps.app.goo.gl/kopilerengmanduk',
                'instagram_url' => 'https://instagram.com/kopi.lereng.manduk',
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => false,
                'products' => [
                    ['name' => 'Kopi Tubruk', 'price' => 'Rp8.000'],
                    ['name' => 'Kopi Susu Aren', 'price' => 'Rp12.000'],
                ],
                'hero_image' => '/images/umkm/kopi-lereng.jpg',
            ],
            [
                'name' => 'Gerai Kerajinan Anyaman',
                'category' => 'kerajinan',
                'tagline' => 'Produk anyaman pandan hasil karya ibu-ibu setempat',
                'description' => 'Menjual tas, topi, dan tikar dari bahan pandan kering dengan motif khas Manduk.',
                'whatsapp_number' => '6281122334455',
                'status' => ContentStatus::PUBLISHED,
                'is_featured' => false,
                'products' => [
                    ['name' => 'Tas Anyam', 'price' => 'Rp45.000'],
                    ['name' => 'Tikar Piknik', 'price' => 'Rp35.000'],
                ],
                'hero_image' => '/images/umkm/kerajinan-anyaman.jpg',
            ],
        ];

        foreach ($items as $attributes) {
            $slug = $attributes['slug'] ?? str($attributes['name'])->slug();
            $metadata = $attributes['metadata'] ?? [];
            $paymentMethods = $metadata['payment_methods'] ?? ['Tunai', 'QRIS'];
            $metadata['payment_methods'] = $paymentMethods;

            Umkm::query()->updateOrCreate(
                ['slug' => $slug],
                array_merge($attributes, [
                    'slug' => $slug,
                    'metadata' => $metadata,
                ])
            );
        }
    }
}
