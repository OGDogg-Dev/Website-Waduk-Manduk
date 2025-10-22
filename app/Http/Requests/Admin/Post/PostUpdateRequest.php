<?php

namespace App\Http\Requests\Admin\Post;

use App\Models\Post;

class PostUpdateRequest extends PostRequest
{
    protected function postId(): ?int
    {
        /** @var Post|null $post */
        $post = $this->route('post');

        return $post?->getKey();
    }
}
