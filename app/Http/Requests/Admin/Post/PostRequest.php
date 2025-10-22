<?php

namespace App\Http\Requests\Admin\Post;

use App\Enums\ContentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

abstract class PostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $ignoreId = $this->postId();

        return [
            'title' => ['required', 'string', 'max:180'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('posts', 'slug')->ignore($ignoreId),
            ],
            'excerpt' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'status' => ['required', 'string', Rule::in($this->statusValues())],
            'published_at' => ['nullable', 'date'],
            'cover_media_id' => ['nullable', 'integer', 'exists:media,id'],
            'cover_image' => ['nullable', 'image', 'max:25600'],
            'meta' => ['nullable', 'array'],
        ];
    }

    public function validatedPayload(): array
    {
        $data = $this->validated();
        $data['slug'] = $data['slug'] ?? null;
        $data['meta'] = $data['meta'] ?? [];

        if (array_key_exists('cover_media_id', $data)) {
            $data['cover_media_id'] = $data['cover_media_id'] ?? null;
        }

        if (! empty($data['published_at'])) {
            $data['published_at'] = Carbon::parse($data['published_at']);
        } else {
            $data['published_at'] = null;
        }

        unset($data['cover_image']);

        return $data;
    }

    abstract protected function postId(): ?int;

    /**
     * @return array<int, string>
     */
    protected function statusValues(): array
    {
        return collect(ContentStatus::cases())
            ->reject(fn (ContentStatus $status) => $status === ContentStatus::ARCHIVED)
            ->map(fn (ContentStatus $status) => $status->value)
            ->values()
            ->all();
    }
}
