<?php

namespace App\Http\Requests\Admin\Story;

use App\Models\Story;

class StoryUpdateRequest extends StoryRequest
{
    protected function storyId(): ?int
    {
        /** @var Story|null $story */
        $story = $this->route('story');

        return $story?->getKey();
    }
}

