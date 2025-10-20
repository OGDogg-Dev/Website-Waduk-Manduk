<?php

namespace App\Http\Requests\Admin\Event;

use App\Models\Event;

class EventUpdateRequest extends EventRequest
{
    protected function eventId(): ?int
    {
        /** @var Event|null $event */
        $event = $this->route('event');

        return $event?->getKey();
    }
}

