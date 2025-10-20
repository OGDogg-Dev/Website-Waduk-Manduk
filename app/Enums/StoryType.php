<?php

namespace App\Enums;

enum StoryType: string
{
    case BLOG = 'blog';
    case UPDATE = 'update';
    case GALLERY = 'gallery';
    case UGC = 'ugc';

    public function label(): string
    {
        return match ($this) {
            self::BLOG => 'Blog Ekowisata',
            self::UPDATE => 'Kabar Terbaru',
            self::GALLERY => 'Galeri Visual',
            self::UGC => 'Cerita Pengunjung',
        };
    }
}

