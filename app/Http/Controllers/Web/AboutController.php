<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\SiteStatus;
use App\Models\Spot;
use App\Models\Story;
use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Kontak/Index', [
            'metrics' => [
                'spots' => Spot::query()->published()->count(),
                'umkm' => Umkm::query()->published()->count(),
                'events' => Event::query()->published()->count(),
                'stories' => Story::query()->published()->count(),
            ],
            'latestStatus' => SiteStatus::query()
                ->orderByDesc('reported_at')
                ->take(3)
                ->get([
                    'crowd_level',
                    'weather_summary',
                    'reported_at',
                    'advisory',
                ]),
        ]);
    }
}
