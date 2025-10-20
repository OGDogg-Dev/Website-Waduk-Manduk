<?php

namespace App\Http\Requests\Admin\Spot;

use App\Models\Spot;

class SpotUpdateRequest extends SpotRequest
{
    protected function spotId(): ?int
    {
        /** @var Spot|null $spot */
        $spot = $this->route('spot');

        return $spot?->getKey();
    }
}

