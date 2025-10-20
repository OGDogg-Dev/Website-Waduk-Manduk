<?php

namespace App\Models;

use App\Enums\RoleType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'name' => RoleType::class,
    ];

    /**
     * Users that belong to this role.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)
            ->withPivot('assigned_at')
            ->withTimestamps();
    }
}
