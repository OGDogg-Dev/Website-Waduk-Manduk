<?php

namespace App\Http\Requests\Admin\Post;

class PostStoreRequest extends PostRequest
{
    protected function postId(): ?int
    {
        return null;
    }
}
