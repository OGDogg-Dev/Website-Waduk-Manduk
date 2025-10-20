<?php

namespace App\Models;

use App\Enums\ContentStatus;
use App\Enums\StoryType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Story extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'type',
        'status',
        'hero_image',
        'excerpt',
        'body',
        'tags',
        'gallery',
        'source_name',
        'source_url',
        'published_at',
        'author_id',
        'reviewed_by',
        'metadata',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'type' => StoryType::class,
        'status' => ContentStatus::class,
        'tags' => 'array',
        'gallery' => 'array',
        'metadata' => 'array',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $story): void {
            if (! $story->slug || $story->isDirty('title') && ! $story->isDirty('slug')) {
                $story->slug = Str::slug($story->title);
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', ContentStatus::PUBLISHED)
            ->orderByDesc('published_at');
    }
}
