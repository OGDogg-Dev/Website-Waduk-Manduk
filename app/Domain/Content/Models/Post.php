<?php

namespace App\Domain\Content\Models;

use App\Domain\Shared\Concerns\HasSlugFromTitle;
use App\Enums\ContentStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;
    use HasSlugFromTitle;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'status',
        'cover_media_id',
        'published_at',
        'meta',
        'created_by',
        'updated_by',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ContentStatus::class,
        'published_at' => 'datetime',
        'meta' => 'array',
    ];

    protected $attributes = [
        'status' => ContentStatus::DRAFT->value,
    ];

    public function coverMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'cover_media_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function editor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query
            ->where('status', ContentStatus::PUBLISHED)
            ->orderByDesc('published_at');
    }
}
