<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function __invoke(): Response
    {
        $umkm = Umkm::query()
            ->published()
            ->orderByDesc('is_featured')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'slug',
                'category',
                'tagline',
                'description',
                'hero_image',
                'products',
                'whatsapp_number',
                'maps_url',
                'is_featured',
            ]);

        return Inertia::render('Public/Umkm/Index', [
            'umkm' => $umkm,
            'categories' => $umkm
                ->pluck('category')
                ->filter()
                ->unique()
                ->values(),
        ]);
    }
}
