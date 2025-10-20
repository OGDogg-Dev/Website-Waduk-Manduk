<?php

namespace App\Enums;

enum RoleType: string
{
    case ADMIN = 'ADMIN';
    case EDITOR = 'EDITOR';
    case CONTRIBUTOR = 'CONTRIBUTOR';

    public function displayName(): string
    {
        return match ($this) {
            self::ADMIN => 'Administrator',
            self::EDITOR => 'Editor',
            self::CONTRIBUTOR => 'Kontributor',
        };
    }

    public function description(): ?string
    {
        return match ($this) {
            self::ADMIN => 'Akses penuh termasuk pengaturan sistem dan manajemen pengguna.',
            self::EDITOR => 'Kelola konten utama seperti spot, UMKM, acara, dan site status.',
            self::CONTRIBUTOR => 'Mengusulkan cerita atau update yang perlu ditinjau sebelum tayang.',
        };
    }
}

