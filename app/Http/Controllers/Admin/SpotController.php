<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Requests\Admin\Spot\SpotStoreRequest;
use App\Http\Requests\Admin\Spot\SpotUpdateRequest;
use App\Models\Spot;
use App\Services\MediaUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class SpotController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'type']);

        $spots = Spot::query()
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('headline', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('type', $type))
            ->orderBy('sort_order')
            ->latest('updated_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/Spots/Index', [
            'filters' => $filters,
            'collection' => $spots->through(
                fn (Spot $spot) => [
                    'id' => $spot->id,
                    'name' => $spot->name,
                    'type' => $spot->type,
                    'status' => $spot->status->value,
                    'is_featured' => $spot->is_featured,
                    'sort_order' => $spot->sort_order,
                    'updated_at' => optional($spot->updated_at)->toIso8601String(),
                ]
            ),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/Spots/Form', [
            'spot' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(SpotStoreRequest $request): RedirectResponse
    {
        Log::info('spot:store:received', [
            'has_hero' => $request->hasFile('hero_image'),
            'has_gallery' => $request->hasFile('gallery'),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $data = $request->validatedPayload();
        unset($data['existing_gallery']);
        $data['metadata'] = $request->input('metadata', []);

        if ($hero = MediaUploader::store($request->file('hero_image'), 'images/spots/hero')) {
            $data['hero_image'] = $hero;
        }

        $data['gallery'] = MediaUploader::storeMany($request->file('gallery'), 'images/spots/gallery');

        Spot::query()->create($data);

        return redirect()
            ->route('admin.spots.index')
            ->with('success', 'Spot berhasil dibuat.');
    }

    public function show(Spot $spot): Response
    {
        return $this->inertia()->render('Admin/Spots/Show', [
            'spot' => $spot->toArray(),
        ]);
    }

    public function edit(Spot $spot): Response
    {
        return $this->inertia()->render('Admin/Spots/Form', [
            'spot' => $spot->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(SpotUpdateRequest $request, Spot $spot): RedirectResponse
    {
        Log::info('spot:update:received', [
            'spot_id' => $spot->getKey(),
            'has_hero' => $request->hasFile('hero_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $payload = $request->validatedPayload();
        $existingGallery = Arr::pull($payload, 'existing_gallery', []);
        $payload['metadata'] = $request->input('metadata', []);

        if ($request->hasFile('hero_image')) {
            MediaUploader::delete($spot->hero_image);
            $payload['hero_image'] = MediaUploader::store($request->file('hero_image'), 'images/spots/hero');
        }

        $newGallery = MediaUploader::storeMany($request->file('gallery'), 'images/spots/gallery');
        $payload['gallery'] = array_values(array_merge($existingGallery, $newGallery));

        $spot->update($payload);

        return redirect()
            ->route('admin.spots.edit', $spot)
            ->with('success', 'Spot berhasil diperbarui.');
    }

    public function destroy(Spot $spot): RedirectResponse
    {
        $spot->delete();

        return redirect()
            ->route('admin.spots.index')
            ->with('success', 'Spot berhasil dihapus.');
    }

    private function formOptions(): array
    {
        return [
            'status' => collect(ContentStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => ucfirst($status->value),
            ])->values()->all(),
            'types' => [
                ['value' => 'entrance', 'label' => 'Gerbang / Akses'],
                ['value' => 'viewpoint', 'label' => 'Titik Pandang'],
                ['value' => 'trail', 'label' => 'Jalur / Trek'],
                ['value' => 'facility', 'label' => 'Fasilitas'],
                ['value' => 'education', 'label' => 'Edukasi & Interpretasi'],
            ],
        ];
    }
}
