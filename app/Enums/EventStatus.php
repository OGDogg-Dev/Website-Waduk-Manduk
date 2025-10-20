<?php

namespace App\Enums;

enum EventStatus: string
{
    case DRAFT = 'draft';
    case SCHEDULED = 'scheduled';
    case PUBLISHED = 'published';
    case COMPLETED = 'completed';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::DRAFT => 'Draft',
            self::SCHEDULED => 'Terjadwal',
            self::PUBLISHED => 'Dipublikasikan',
            self::COMPLETED => 'Selesai',
            self::CANCELLED => 'Dibatalkan',
        };
    }
}

