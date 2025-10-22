<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Requests\Admin\Event\EventStoreRequest;
use App\Http\Requests\Admin\Event\EventUpdateRequest;
use App\Models\Event;
use App\Services\MediaUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class EventController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'type']);

        $events = Event::query()
            ->with(['createdBy:id,name'])
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('summary', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('event_type', $type))
            ->latest('start_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/Events/Index', [
            'filters' => $filters,
            'collection' => $events->through(
                fn (Event $event) => [
                    'id' => $event->id,
                    'title' => $event->title,
                    'status' => $event->status->value,
                    'start_at' => optional($event->start_at)->toIso8601String(),
                    'end_at' => optional($event->end_at)->toIso8601String(),
                    'event_type' => $event->event_type,
                    'organizer' => $event->organizer,
                    'author' => $event->createdBy?->name,
                ]
            ),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/Events/Form', [
            'event' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(EventStoreRequest $request): RedirectResponse
    {
        Log::info('event:store:received', [
            'has_cover' => $request->hasFile('cover_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $data = $request->validatedPayload();
        unset($data['existing_gallery']);
        $data['gallery'] = MediaUploader::storeMany($request->file('gallery'), 'images/events/gallery');
        $data['metadata'] = $request->input('metadata', []);
        $data['created_by'] = $request->user()?->id;
        $data['updated_by'] = $request->user()?->id;

        if ($cover = MediaUploader::store($request->file('cover_image'), 'images/events/cover')) {
            $data['cover_image'] = $cover;
        }

        Event::query()->create($data);

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event berhasil dibuat.');
    }

    public function show(Event $event): Response
    {
        $event->load(['createdBy:id,name', 'updatedBy:id,name']);

        return $this->inertia()->render('Admin/Events/Show', [
            'event' => $event->toArray(),
        ]);
    }

    public function edit(Event $event): Response
    {
        return $this->inertia()->render('Admin/Events/Form', [
            'event' => $event->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(EventUpdateRequest $request, Event $event): RedirectResponse
    {
        Log::info('event:update:received', [
            'event_id' => $event->getKey(),
            'has_cover' => $request->hasFile('cover_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $payload = $request->validatedPayload();
        $existingGallery = Arr::pull($payload, 'existing_gallery', []);
        $payload['metadata'] = $request->input('metadata', []);
        $payload['updated_by'] = $request->user()?->id;

        if ($request->hasFile('cover_image')) {
            MediaUploader::delete($event->cover_image);
            $payload['cover_image'] = MediaUploader::store($request->file('cover_image'), 'images/events/cover');
        }

        $newGallery = MediaUploader::storeMany($request->file('gallery'), 'images/events/gallery');
        $payload['gallery'] = array_values(array_merge($existingGallery, $newGallery));

        $event->update($payload);

        return redirect()
            ->route('admin.events.edit', $event)
            ->with('success', 'Event berhasil diperbarui.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()
            ->route('admin.events.index')
            ->with('success', 'Event berhasil dihapus.');
    }

    private function formOptions(): array
    {
        $status = collect(ContentStatus::cases())->filter(function (ContentStatus $status) {
            return $status !== ContentStatus::ARCHIVED;
        })->map(fn (ContentStatus $status) => [
            'value' => $status->value,
            'label' => ucfirst($status->value),
        ])->values()->all();

        $types = Event::query()
            ->select('event_type')
            ->whereNotNull('event_type')
            ->distinct()
            ->orderBy('event_type')
            ->pluck('event_type')
            ->map(fn ($type) => ['value' => $type, 'label' => ucfirst($type)])
            ->values()
            ->all();

        return [
            'status' => $status,
            'types' => $types,
        ];
    }
}
