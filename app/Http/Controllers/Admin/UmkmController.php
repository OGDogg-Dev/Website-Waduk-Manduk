<?php

namespace App\Http\Controllers\Admin;

use App\Enums\ContentStatus;
use App\Http\Requests\Admin\Umkm\UmkmStoreRequest;
use App\Http\Requests\Admin\Umkm\UmkmUpdateRequest;
use App\Models\Umkm;
use App\Services\MediaUploader;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class UmkmController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'category', 'featured']);

        $umkms = Umkm::query()
            ->when($filters['search'] ?? null, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('tagline', 'like', "%{$search}%");
                });
            })
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['category'] ?? null, fn ($query, $category) => $query->where('category', $category))
            ->when($filters['featured'] ?? null, fn ($query) => $query->where('is_featured', true))
            ->orderByDesc('is_featured')
            ->latest('updated_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/Umkm/Index', [
            'filters' => $filters,
            'collection' => $umkms->through(
                fn (Umkm $umkm) => [
                    'id' => $umkm->id,
                    'name' => $umkm->name,
                    'category' => $umkm->category,
                    'status' => $umkm->status->value,
                    'is_featured' => $umkm->is_featured,
                    'whatsapp_number' => $umkm->whatsapp_number,
                    'updated_at' => optional($umkm->updated_at)->toIso8601String(),
                ]
            ),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/Umkm/Form', [
            'umkm' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(UmkmStoreRequest $request): RedirectResponse
    {
        Log::info('umkm:store:received', [
            'has_hero' => $request->hasFile('hero_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $data = $request->validatedPayload();
        unset($data['existing_gallery']);
        $data['opening_hours'] = $request->input('opening_hours', []);
        $data['products'] = $request->input('products', []);
        $data['metadata'] = $request->input('metadata', []);

        if ($hero = MediaUploader::store($request->file('hero_image'), 'images/umkm/hero')) {
            $data['hero_image'] = $hero;
        }

        $data['gallery'] = MediaUploader::storeMany($request->file('gallery'), 'images/umkm/gallery');

        Umkm::query()->create($data);

        return redirect()
            ->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil dibuat.');
    }

    public function show(Umkm $umkm): Response
    {
        return $this->inertia()->render('Admin/Umkm/Show', [
            'umkm' => $umkm->toArray(),
        ]);
    }

    public function edit(Umkm $umkm): Response
    {
        return $this->inertia()->render('Admin/Umkm/Form', [
            'umkm' => $umkm->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(UmkmUpdateRequest $request, Umkm $umkm): RedirectResponse
    {
        Log::info('umkm:update:received', [
            'umkm_id' => $umkm->getKey(),
            'has_hero' => $request->hasFile('hero_image'),
            'gallery_count' => count($request->file('gallery', [])),
            'file_keys' => array_keys($request->allFiles()),
        ]);

        $payload = $request->validatedPayload();
        $existingGallery = Arr::pull($payload, 'existing_gallery', []);
        $payload['opening_hours'] = $request->input('opening_hours', []);
        $payload['products'] = $request->input('products', []);
        $payload['metadata'] = $request->input('metadata', []);

        if ($request->hasFile('hero_image')) {
            MediaUploader::delete($umkm->hero_image);
            $payload['hero_image'] = MediaUploader::store($request->file('hero_image'), 'images/umkm/hero');
        }

        $newGallery = MediaUploader::storeMany($request->file('gallery'), 'images/umkm/gallery');
        $payload['gallery'] = array_values(array_merge($existingGallery, $newGallery));

        $umkm->update($payload);

        return redirect()
            ->route('admin.umkm.edit', $umkm)
            ->with('success', 'Data UMKM berhasil diperbarui.');
    }

    public function destroy(Umkm $umkm): RedirectResponse
    {
        $umkm->delete();

        return redirect()
            ->route('admin.umkm.index')
            ->with('success', 'Data UMKM berhasil dihapus.');
    }

    private function formOptions(): array
    {
        $status = collect(ContentStatus::cases())->map(fn ($status) => [
            'value' => $status->value,
            'label' => ucfirst($status->value),
        ])->values()->all();

        $categories = Umkm::query()
            ->select('category')
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->map(fn ($category) => ['value' => $category, 'label' => ucfirst($category)])
            ->values()
            ->all();

        return [
            'status' => $status,
            'categories' => $categories,
        ];
    }
}
