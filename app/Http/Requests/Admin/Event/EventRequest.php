<?php

namespace App\Http\Requests\Admin\Event;

use App\Enums\ContentStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

abstract class EventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $ignoreId = $this->eventId();

        return [
            'title' => ['required', 'string', 'max:180'],
            'slug' => [
                'nullable',
                'string',
                'max:180',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('events', 'slug')->ignore($ignoreId),
            ],
            'tagline' => ['nullable', 'string', 'max:180'],
            'summary' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:180'],
            'status' => ['required', 'string', Rule::in($this->statusValues())],
            'is_featured' => ['sometimes', 'boolean'],
            'start_at' => ['nullable', 'date'],
            'end_at' => ['nullable', 'date'],
            'published_at' => ['nullable', 'date'],
            'event_type' => ['nullable', 'string', 'max:120'],
            'organizer' => ['nullable', 'string', 'max:150'],
            'contact_person' => ['nullable', 'string', 'max:150'],
            'registration_url' => ['nullable', 'url', 'max:255'],
            'cover_image' => ['nullable', 'image', 'max:25600'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['nullable', 'image', 'max:25600'],
            'existing_gallery' => ['nullable', 'array'],
            'existing_gallery.*' => ['string'],
            'metadata' => ['nullable', 'array'],
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                $start = $this->input('start_at');
                $end = $this->input('end_at');

                if ($start && $end && strtotime($end) < strtotime($start)) {
                    $validator->errors()->add('end_at', 'End time harus setelah start time.');
                }
            },
        ];
    }

    public function validatedPayload(): array
    {
        $data = $this->validated();
        $data['slug'] = $data['slug'] ?? null;
        $data['is_featured'] = (bool) ($data['is_featured'] ?? false);
        $data['existing_gallery'] = $data['existing_gallery'] ?? [];

        unset($data['cover_image'], $data['gallery']);

        return $data;
    }

    abstract protected function eventId(): ?int;

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
