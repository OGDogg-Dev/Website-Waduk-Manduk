<?php

namespace App\Enums;

enum CrowdLevel: string
{
    case QUIET = 'sepi';
    case NORMAL = 'normal';
    case BUSY = 'ramai';
    case CLOSED = 'ditutup';

    public function label(): string
    {
        return match ($this) {
            self::QUIET => 'Sepi',
            self::NORMAL => 'Normal',
            self::BUSY => 'Ramai',
            self::CLOSED => 'Ditutup',
        };
    }
}

