<?php

namespace Database\Seeders\Core;

use App\Enums\RoleType;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (RoleType::cases() as $roleType) {
            Role::query()->updateOrCreate(
                ['name' => $roleType->value],
                [
                    'display_name' => $roleType->displayName(),
                    'description' => $roleType->description(),
                ]
            );
        }
    }
}

