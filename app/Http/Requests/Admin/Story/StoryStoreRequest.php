<?php

namespace App\Http\Requests\Admin\Story;

class StoryStoreRequest extends StoryRequest
{
    protected function storyId(): ?int
    {
        return null;
    }
}

