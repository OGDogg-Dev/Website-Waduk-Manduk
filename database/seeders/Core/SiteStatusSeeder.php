<?php

namespace Database\Seeders\Core;

use App\Enums\CrowdLevel;
use App\Models\SiteStatus;
use App\Models\User;
use Illuminate\Database\Seeder;

class SiteStatusSeeder extends Seeder
{
    public function run(): void
    {
        $reporter = User::query()->first();

        SiteStatus::query()->update(['is_current' => false]);

        SiteStatus::query()->create([
            'crowd_level' => CrowdLevel::NORMAL,
            'weather_summary' => 'Cerah berawan',
            'temperature' => '27°C',
            'wind' => 'Angin sepoi-sepoi',
            'is_raining' => false,
            'advisory' => 'Wajib menjaga kebersihan area sekitar dan ikuti jalur yang tersedia.',
            'metrics' => [
                'water_level' => 'Stabil',
                'uv_index' => 'Sedang',
            ],
            'is_current' => true,
            'reported_at' => now(),
            'valid_until' => now()->addHours(6),
            'reported_by' => $reporter?->id,
        ]);
    }
}
