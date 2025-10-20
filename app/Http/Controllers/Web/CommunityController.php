<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Story;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Community/Index', [
            'events' => Event::query()
                ->published()
                ->orderByDesc('start_at')
                ->take(6)
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
            'stories' => Story::query()
                ->published()
                ->whereIn('type', ['ugc', 'update'])
                ->orderByDesc('published_at')
                ->take(6)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'hero_image',
                    'excerpt',
                    'type',
                    'published_at',
                ]),
        ]);
    }
}
