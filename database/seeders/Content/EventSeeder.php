<?php

namespace Database\Seeders\Content;

use App\Enums\EventStatus;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::query()->first();

        $events = [
            [
                'title' => 'Tur Edukasi Konservasi Mingguan',
                'tagline' => 'Belajar flora-fauna kunci bersama pemandu komunitas',
                'summary' => 'Tur 90 menit mengelilingi jalur interpretasi rawa untuk mempelajari ekosistem waduk.',
                'body' => 'Peserta diajak mengenal jenis burung air dan tanaman khas rawa Manduk. Termasuk sesi praktik singkat mencatat temuan.',
                'location' => 'Jalur Interpretasi Rawa',
                'status' => EventStatus::SCHEDULED,
                'start_at' => Carbon::now()->addDays(7)->setTime(8, 0),
                'end_at' => Carbon::now()->addDays(7)->setTime(10, 0),
                'event_type' => 'tur-edukasi',
                'organizer' => 'Komunitas Sahabat Manduk',
                'contact_person' => 'Adit (0821-5566-7788)',
                'registration_url' => 'https://bit.ly/tur-konservasi-manduk',
                'cover_image' => '/images/events/tur-konservasi.jpg',
                'gallery' => [
                    '/images/events/tur-konservasi-1.jpg',
                    '/images/events/tur-konservasi-2.jpg',
                ],
                'metadata' => [
                    'quota' => 25,
                    'difficulty' => 'ringan',
                ],
            ],
            [
                'title' => 'Pasar Kuliner Senja',
                'tagline' => 'Festival UMKM kuliner lokal setiap Sabtu sore',
                'summary' => 'Menikmati ragam kuliner desa, live akustik, dan demo memasak bahan lokal.',
                'body' => 'Acara rutin yang menghadirkan 15 UMKM mitra dengan fokus menu berbahan hasil kebun warga.',
                'location' => 'Lapangan Komunitas',
                'status' => EventStatus::PUBLISHED,
                'start_at' => Carbon::now()->addDays(3)->setTime(16, 0),
                'end_at' => Carbon::now()->addDays(3)->setTime(20, 0),
                'event_type' => 'festival',
                'organizer' => 'Forum UMKM Manduk',
                'contact_person' => 'Mbak Wati (0813-1122-3344)',
                'registration_url' => null,
                'cover_image' => '/images/events/pasar-kuliner.jpg',
                'metadata' => [
                    'is_recurring' => true,
                    'recurring_note' => 'Setiap Sabtu pekan kedua dan keempat',
                ],
            ],
        ];

        foreach ($events as $attributes) {
            Event::query()->updateOrCreate(
                ['slug' => $attributes['slug'] ?? str($attributes['title'])->slug()],
                array_merge($attributes, [
                    'created_by' => $admin?->id,
                    'updated_by' => $admin?->id,
                    'published_at' => $attributes['status'] === EventStatus::PUBLISHED
                        ? ($attributes['published_at'] ?? now()->subDay())
                        : $attributes['published_at'] ?? null,
                ])
            );
        }
    }
}

