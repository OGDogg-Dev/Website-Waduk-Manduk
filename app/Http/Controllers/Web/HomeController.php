<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\SiteStatus;
use App\Models\Spot;
use App\Models\Story;
use App\Models\Umkm;
use Inertia\Response;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $status = SiteStatus::query()->current()->first();

        return Inertia::render('Public/Home/Index', [
            'status' => $status,
            'featuredSpots' => Spot::query()
                ->featured()
                ->take(4)
                ->get([
                    'id',
                    'name',
                    'slug',
                    'type',
                    'headline',
                    'description',
                    'hero_image',
                ]),
            'featuredUmkm' => Umkm::query()
                ->featured()
                ->orderBy('name')
                ->take(4)
                ->get([
                    'id',
                    'name',
                    'slug',
                    'tagline',
                    'category',
                    'hero_image',
                    'whatsapp_number',
                    'maps_url',
                    'is_featured',
                ]),
            'upcomingEvents' => Event::query()
                ->published()
                ->whereNotNull('start_at')
                ->orderBy('start_at')
                ->take(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'tagline',
                    'start_at',
                    'event_type',
                    'location',
                    'cover_image',
                ]),
            'recentStories' => Story::query()
                ->published()
                ->orderByDesc('published_at')
                ->take(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'type',
                    'excerpt',
                    'hero_image',
                    'published_at',
                ]),
        ]);
    }
}
