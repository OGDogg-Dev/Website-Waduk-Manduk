<?php

namespace App\Http\Requests\Admin\Spot;

class SpotStoreRequest extends SpotRequest
{
    protected function spotId(): ?int
    {
        return null;
    }
}

