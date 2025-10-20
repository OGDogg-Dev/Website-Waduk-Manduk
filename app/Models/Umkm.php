<?php

namespace App\Models;

use App\Enums\ContentStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Umkm extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'owner_name',
        'category',
        'tagline',
        'description',
        'whatsapp_number',
        'maps_url',
        'instagram_url',
        'facebook_url',
        'status',
        'is_featured',
        'opening_hours',
        'products',
        'address',
        'hero_image',
        'gallery',
        'metadata',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'status' => ContentStatus::class,
        'is_featured' => 'boolean',
        'opening_hours' => 'array',
        'products' => 'array',
        'gallery' => 'array',
        'metadata' => 'array',
    ];

    protected static function booted(): void
    {
        static::saving(function (self $umkm): void {
            if (! $umkm->slug || $umkm->isDirty('name') && ! $umkm->isDirty('slug')) {
                $umkm->slug = Str::slug($umkm->name);
            }
        });
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', ContentStatus::PUBLISHED);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true)->where('status', ContentStatus::PUBLISHED);
    }
}
