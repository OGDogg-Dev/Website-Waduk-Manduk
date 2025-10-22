<?php

namespace Database\Seeders;

use Database\Seeders\Content\EventSeeder;
use Database\Seeders\Content\PostSeeder;
use Database\Seeders\Content\SpotSeeder;
use Database\Seeders\Content\StorySeeder;
use Database\Seeders\Content\UmkmSeeder;
use Database\Seeders\Core\RoleSeeder;
use Database\Seeders\Core\SiteStatusSeeder;
use Database\Seeders\Core\UserSeeder;
use Database\Seeders\Core\HomepageSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            SiteStatusSeeder::class,
            HomepageSeeder::class,
            SpotSeeder::class,
            UmkmSeeder::class,
            PostSeeder::class,
            EventSeeder::class,
            StorySeeder::class,
        ]);
    }
}
