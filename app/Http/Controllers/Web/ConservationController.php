<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Spot;
use App\Models\Story;
use Inertia\Inertia;
use Inertia\Response;

class ConservationController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Conservation/Index', [
            'educationSpots' => Spot::query()
                ->published()
                ->whereIn('type', ['education', 'trail'])
                ->orderBy('sort_order')
                ->get([
                    'id',
                    'name',
                    'slug',
                    'headline',
                    'description',
                    'hero_image',
                ]),
            'conservationStories' => Story::query()
                ->published()
                ->whereIn('type', ['blog', 'update'])
                ->orderByDesc('published_at')
                ->take(5)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'excerpt',
                    'hero_image',
                    'published_at',
                ]),
            'programs' => Event::query()
                ->published()
                ->where('event_type', 'like', '%tur%')
                ->orderBy('start_at')
                ->take(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'tagline',
                    'start_at',
                    'location',
                    'event_type',
                    'cover_image',
                ]),
        ]);
    }
}
