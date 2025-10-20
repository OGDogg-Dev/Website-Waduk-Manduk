<?php

namespace App\Http\Requests\Admin\Event;

class EventStoreRequest extends EventRequest
{
    protected function eventId(): ?int
    {
        return null;
    }
}

