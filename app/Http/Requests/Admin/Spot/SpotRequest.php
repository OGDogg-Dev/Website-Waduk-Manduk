<?php

namespace App\Http\Requests\Admin\Spot;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

abstract class SpotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $ignoreId = $this->spotId();

        return [
            'name' => ['required', 'string', 'max:180'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('spots', 'slug')->ignore($ignoreId),
            ],
            'type' => ['required', 'string', 'max:50'],
            'category' => ['nullable', 'string', 'max:100'],
            'headline' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'tips' => ['nullable', 'string'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'status' => ['required', 'string', 'in:draft,review,published,archived'],
            'is_featured' => ['sometimes', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'hero_image' => ['nullable', 'image', 'max:25600'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'image', 'max:25600'],
            'existing_gallery' => ['nullable', 'array'],
            'existing_gallery.*' => ['string'],
            'metadata' => ['nullable', 'array'],
        ];
    }

    public function validatedPayload(): array
    {
        $data = $this->validated();
        $data['slug'] = $data['slug'] ?? null;
        $data['is_featured'] = (bool) ($data['is_featured'] ?? false);
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['existing_gallery'] = $data['existing_gallery'] ?? [];

        unset($data['hero_image'], $data['gallery']);

        return $data;
    }

    abstract protected function spotId(): ?int;
}
