<?php

namespace Database\Seeders\Content;

use App\Enums\ContentStatus;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->first();

        $posts = [
            [
                'title' => 'Panduan Lengkap Berkunjung ke Waduk Manduk',
                'excerpt' => 'Rangkuman informasi penting sebelum merencanakan perjalanan akhir pekan Anda.',
                'body' => '<p>Nikmati udara segar di Waduk Manduk dengan tips transportasi, jam operasional, dan fasilitas terkini.</p>',
                'status' => ContentStatus::PUBLISHED,
                'published_at' => Carbon::now()->subDays(3),
                'meta' => [
                    'keywords' => ['panduan', 'waduk manduk', 'tips perjalanan'],
                ],
            ],
            [
                'title' => 'Konservasi Mangrove Manduk: Kolaborasi Komunitas',
                'excerpt' => 'Cerita mengenai komunitas lokal dalam merawat kawasan mangrove di sekitar waduk.',
                'body' => '<p>Program konservasi dilakukan secara rutin dengan dukungan relawan muda desa.</p>',
                'status' => ContentStatus::REVIEW,
                'meta' => [
                    'keywords' => ['konservasi', 'komunitas'],
                ],
            ],
            [
                'title' => 'Update Harga Tiket dan Paket Wisata 2025',
                'excerpt' => 'Daftar harga terbaru untuk tiket masuk dan paket tur resmi Waduk Manduk.',
                'body' => '<p>Pembaruan tarif berlaku mulai Januari 2025 termasuk promo kelompok sekolah.</p>',
                'status' => ContentStatus::DRAFT,
            ],
        ];

        foreach ($posts as $attributes) {
            Post::query()->updateOrCreate(
                ['slug' => $attributes['slug'] ?? str($attributes['title'])->slug()],
                array_merge($attributes, [
                    'created_by' => $admin?->id,
                    'updated_by' => $admin?->id,
                    'published_at' => ($attributes['status'] ?? ContentStatus::DRAFT) === ContentStatus::PUBLISHED
                        ? ($attributes['published_at'] ?? Carbon::now())
                        : null,
                ])
            );
        }
    }
}
