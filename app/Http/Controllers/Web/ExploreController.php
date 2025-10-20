<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\SiteStatus;
use App\Models\Spot;
use App\Models\Story;
use Inertia\Inertia;
use Inertia\Response;

class ExploreController extends Controller
{
    public function __invoke(): Response
    {
        $spots = Spot::query()
            ->published()
            ->orderBy('sort_order')
            ->get([
                'id',
                'name',
                'slug',
                'type',
                'headline',
                'description',
                'hero_image',
                'gallery',
            ]);

        return Inertia::render('Public/Explore/Index', [
            'status' => SiteStatus::query()->current()->first(),
            'spots' => $spots,
            'highlights' => [
                'viewpoints' => $spots->where('type', 'viewpoint')->values(),
                'trails' => $spots->where('type', 'trail')->values(),
                'education' => $spots->whereIn('type', ['education', 'facility'])->values(),
            ],
            'stories' => Story::query()
                ->published()
                ->whereIn('type', ['gallery', 'blog'])
                ->orderByDesc('published_at')
                ->take(4)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'type',
                    'hero_image',
                    'excerpt',
                    'published_at',
                ]),
        ]);
    }
}
