<?php

namespace App\Models;

use App\Enums\CrowdLevel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteStatus extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'crowd_level',
        'weather_summary',
        'temperature',
        'wind',
        'is_raining',
        'advisory',
        'metrics',
        'is_current',
        'reported_at',
        'valid_until',
        'reported_by',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'crowd_level' => CrowdLevel::class,
        'is_raining' => 'boolean',
        'is_current' => 'boolean',
        'metrics' => 'array',
        'reported_at' => 'datetime',
        'valid_until' => 'datetime',
    ];

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    public function scopeCurrent(Builder $query): Builder
    {
        return $query->where('is_current', true)->orderByDesc('reported_at');
    }
}
