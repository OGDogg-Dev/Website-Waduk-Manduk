<?php

namespace App\Enums;

enum ContentStatus: string
{
    case DRAFT = 'draft';
    case REVIEW = 'review';
    case PUBLISHED = 'published';
    case ARCHIVED = 'archived';

    public function isPublishable(): bool
    {
        return in_array($this, [self::REVIEW, self::PUBLISHED], true);
    }
}

