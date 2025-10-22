<?php

namespace App\Domain\Content\Models;

use App\Domain\Shared\Concerns\HasSlugFromTitle;
use App\Enums\ContentStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Event extends Model
{
    use HasFactory;
    use HasSlugFromTitle;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'tagline',
        'summary',
        'body',
        'location',
        'status',
        'is_featured',
        'start_at',
        'end_at',
        'published_at',
        'event_type',
        'organizer',
        'contact_person',
        'registration_url',
        'cover_image',
        'gallery',
        'metadata',
        'created_by',
        'updated_by',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ContentStatus::class,
        'is_featured' => 'boolean',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'published_at' => 'datetime',
        'gallery' => 'array',
        'metadata' => 'array',
    ];

    protected $attributes = [
        'status' => ContentStatus::DRAFT->value,
    ];

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', ContentStatus::PUBLISHED);
    }

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query
            ->whereNotNull('start_at')
            ->where('start_at', '>=', Carbon::now())
            ->orderBy('start_at');
    }
}
