<?php

namespace Database\Seeders\Content;

use App\Enums\ContentStatus;
use App\Enums\StoryType;
use App\Models\Story;
use App\Models\User;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        $editor = User::query()->firstWhere('email', env('SEED_EDITOR_EMAIL', 'editor@wadukmanduk.test'));
        $contributor = User::query()->firstWhere('email', env('SEED_CONTRIBUTOR_EMAIL', 'kontributor@wadukmanduk.test'));

        $stories = [
            [
                'title' => 'Mengenal Burung-Burung Penjaga Waduk Manduk',
                'type' => StoryType::BLOG,
                'status' => ContentStatus::PUBLISHED,
                'hero_image' => '/images/stories/burung-manduk.jpg',
                'excerpt' => 'Empat spesies burung air yang berperan penting menjaga ekosistem Waduk Manduk.',
                'body' => <<<MARKDOWN
### Penjaga Ekosistem Rawa

Waduk Manduk menjadi rumah bagi setidaknya 48 spesies burung. Empat di antaranya sering terlihat di area jalur interpretasi rawa:

1. **Cangak Abu** – Sang pengintai yang membantu mengendalikan populasi ikan kecil.
2. **Kuntul Kerbau** – Penjaga padang rumput, memangsa serangga berlebih.
3. **Itik Batu** – Indikator kualitas air, karena sensitif terhadap perubahan lingkungan.
4. **Cerek Kernyut** – Migran musiman yang menandai puncak musim kemarau.

Pengunjung diimbau untuk menjaga jarak pandang dan tidak memberi makan satwa liar.
MARKDOWN,
                'tags' => ['ekowisata', 'fauna', 'edukasi'],
                'published_at' => now()->subDays(5),
                'author_id' => $editor?->id,
                'reviewed_by' => $editor?->id,
            ],
            [
                'title' => 'Galeri Swadaya: Festival Reresik Waduk',
                'type' => StoryType::GALLERY,
                'status' => ContentStatus::PUBLISHED,
                'hero_image' => '/images/stories/festival-reresik-cover.jpg',
                'excerpt' => 'Dokumentasi festival bersih waduk oleh relawan komunitas.',
                'body' => <<<MARKDOWN
### Festival Reresik Edisi Agustus

- 120 relawan hadir dari 6 dusun sekitar.
- 340 kilogram sampah berhasil dipilah untuk daur ulang.
- Donasi alat kebersihan dari dua perusahaan mitra lokal.
MARKDOWN,
                'tags' => ['komunitas', 'galeri'],
                'published_at' => now()->subDays(10),
                'author_id' => $editor?->id,
                'reviewed_by' => $editor?->id,
                'gallery' => [
                    '/images/stories/festival-reresik-1.jpg',
                    '/images/stories/festival-reresik-2.jpg',
                    '/images/stories/festival-reresik-3.jpg',
                ],
            ],
            [
                'title' => 'Cerita Pengunjung: Sunrise dari Bukit Cemara',
                'type' => StoryType::UGC,
                'status' => ContentStatus::REVIEW,
                'hero_image' => '/images/stories/ugc-sunrise.jpg',
                'excerpt' => 'Kisah singkat dari Lintang, relawan yang mengajak teman-temannya ke Bukit Cemara.',
                'body' => <<<MARKDOWN
> "Kami berangkat jam 4 pagi. Begitu matahari muncul, kabut yang menyelimuti waduk perlahan hilang. Rasanya damai sekali."

Lintang juga mengingatkan pengunjung untuk membawa kantong sampah sendiri dan tidak meninggalkan sampah plastik.
MARKDOWN,
                'tags' => ['pengunjung', 'sunrise'],
                'published_at' => null,
                'author_id' => $contributor?->id,
                'reviewed_by' => $editor?->id,
            ],
        ];

        foreach ($stories as $attributes) {
            Story::query()->updateOrCreate(
                ['slug' => $attributes['slug'] ?? str($attributes['title'])->slug()],
                $attributes
            );
        }
    }
}

