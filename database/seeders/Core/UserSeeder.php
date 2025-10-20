<?php

namespace Database\Seeders\Core;

use App\Enums\RoleType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator Waduk Manduk',
                'email' => env('SEED_ADMIN_EMAIL', 'admin@wadukmanduk.test'),
                'password' => env('SEED_ADMIN_PASSWORD', 'Password123!'),
                'roles' => [RoleType::ADMIN],
            ],
            [
                'name' => 'Editor Konten',
                'email' => env('SEED_EDITOR_EMAIL', 'editor@wadukmanduk.test'),
                'password' => env('SEED_EDITOR_PASSWORD', 'Password123!'),
                'roles' => [RoleType::EDITOR],
            ],
            [
                'name' => 'Kontributor Komunitas',
                'email' => env('SEED_CONTRIBUTOR_EMAIL', 'kontributor@wadukmanduk.test'),
                'password' => env('SEED_CONTRIBUTOR_PASSWORD', 'Password123!'),
                'roles' => [RoleType::CONTRIBUTOR],
            ],
        ];

        foreach ($users as $payload) {
            /** @var \App\Models\User $user */
            $user = User::query()->updateOrCreate(
                ['email' => $payload['email']],
                [
                    'name' => $payload['name'],
                    'password' => Hash::make($payload['password']),
                ]
            );

            foreach ($payload['roles'] as $role) {
                $user->assignRole($role);
            }
        }
    }
}
