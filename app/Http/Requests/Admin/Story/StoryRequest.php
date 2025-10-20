<?php

namespace App\Http\Requests\Admin\Story;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

abstract class StoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $ignoreId = $this->storyId();

        return [
            'title' => ['required', 'string', 'max:200'],
            'slug' => [
                'nullable',
                'string',
                'max:200',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('stories', 'slug')->ignore($ignoreId),
            ],
            'type' => ['required', 'string', 'in:blog,update,gallery,ugc'],
            'status' => ['required', 'string', 'in:draft,review,published,archived'],
            'hero_image' => ['nullable', 'image', 'max:25600'],
            'excerpt' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:60'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'image', 'max:25600'],
            'existing_gallery' => ['nullable', 'array'],
            'existing_gallery.*' => ['string'],
            'source_name' => ['nullable', 'string', 'max:150'],
            'source_url' => ['nullable', 'url', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'metadata' => ['nullable', 'array'],
        ];
    }

    public function prepareForValidation(): void
    {
        if (! $this->has('type')) {
            $this->merge(['type' => 'blog']);
        }
    }

    public function validatedPayload(): array
    {
        $data = $this->validated();
        $data['slug'] = $data['slug'] ?? null;
        $data['existing_gallery'] = $data['existing_gallery'] ?? [];

        unset($data['hero_image'], $data['gallery']);

        return $data;
    }

    abstract protected function storyId(): ?int;
}
