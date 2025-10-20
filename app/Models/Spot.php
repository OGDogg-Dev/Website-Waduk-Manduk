<?php

namespace App\Models;

use App\Enums\ContentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Spot extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'type',
        'category',
        'headline',
        'description',
        'tips',
        'latitude',
        'longitude',
        'status',
        'is_featured',
        'sort_order',
        'hero_image',
        'gallery',
        'metadata',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'status' => ContentStatus::class,
        'is_featured' => 'boolean',
        'sort_order' => 'integer',
        'gallery' => 'array',
        'metadata' => 'array',
    ];

    public static function booted(): void
    {
        static::saving(function (self $spot): void {
            if (! $spot->slug || $spot->isDirty('name') && ! $spot->isDirty('slug')) {
                $spot->slug = Str::slug($spot->name);
            }
        });
    }

    /**
     * Scope for published spots ordered for presentation.
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', ContentStatus::PUBLISHED)->orderBy('sort_order');
    }
}
