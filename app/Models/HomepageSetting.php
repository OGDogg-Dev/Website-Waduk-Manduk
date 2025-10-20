<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageSetting extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_background',
        'cta_primary_label',
        'cta_primary_url',
        'cta_secondary_label',
        'cta_secondary_url',
        'highlights',
    ];

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'highlights' => 'array',
    ];
}

