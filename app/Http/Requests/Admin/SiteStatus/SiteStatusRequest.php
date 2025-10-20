<?php

namespace App\Http\Requests\Admin\SiteStatus;

use Illuminate\Foundation\Http\FormRequest;

abstract class SiteStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'crowd_level' => ['required', 'string', 'in:sepi,normal,ramai,ditutup'],
            'weather_summary' => ['nullable', 'string', 'max:180'],
            'temperature' => ['nullable', 'string', 'max:50'],
            'wind' => ['nullable', 'string', 'max:120'],
            'is_raining' => ['required', 'boolean'],
            'advisory' => ['nullable', 'string'],
            'metrics' => ['nullable', 'array'],
            'is_current' => ['sometimes', 'boolean'],
            'reported_at' => ['nullable', 'date'],
            'valid_until' => ['nullable', 'date', 'after_or_equal:reported_at'],
        ];
    }

    public function validatedPayload(): array
    {
        return $this->validated();
    }
}
