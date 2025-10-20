<?php

namespace App\Http\Requests\Admin\Umkm;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

abstract class UmkmRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $ignoreId = $this->umkmId();

        return [
            'name' => ['required', 'string', 'max:180'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('umkms', 'slug')->ignore($ignoreId),
            ],
            'owner_name' => ['nullable', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'tagline' => ['nullable', 'string', 'max:160'],
            'description' => ['nullable', 'string'],
            'whatsapp_number' => ['nullable', 'string', 'max:20'],
            'maps_url' => ['nullable', 'url', 'max:255'],
            'instagram_url' => ['nullable', 'url', 'max:255'],
            'facebook_url' => ['nullable', 'url', 'max:255'],
            'status' => ['required', 'string', 'in:draft,review,published,archived'],
            'is_featured' => ['sometimes', 'boolean'],
            'opening_hours' => ['nullable', 'array'],
            'opening_hours.*' => ['string', 'max:120'],
            'products' => ['nullable', 'array'],
            'products.*.name' => ['required_with:products', 'string', 'max:120'],
            'products.*.price' => ['nullable', 'string', 'max:60'],
            'address' => ['nullable', 'string', 'max:255'],
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
        $data['existing_gallery'] = $data['existing_gallery'] ?? [];

        unset($data['hero_image'], $data['gallery']);

        return $data;
    }

    abstract protected function umkmId(): ?int;
}
