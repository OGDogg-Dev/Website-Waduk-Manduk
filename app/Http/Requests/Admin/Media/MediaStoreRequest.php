<?php

namespace App\Http\Requests\Admin\Media;

use Illuminate\Foundation\Http\FormRequest;

class MediaStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'file' => ['required', 'file', 'max:51200', 'mimetypes:image/jpeg,image/png,image/webp,image/svg+xml,application/pdf'],
            'collection' => ['nullable', 'string', 'max:120'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function validatedPayload(): array
    {
        $data = $this->validated();
        $data['collection'] = $data['collection'] ?? null;
        $data['alt_text'] = $data['alt_text'] ?? null;
        $data['caption'] = $data['caption'] ?? null;

        return $data;
    }
}
