<?php

namespace App\Http\Controllers\Admin;

use App\Models\Event;
use App\Models\SiteStatus;
use App\Models\Spot;
use App\Models\Story;
use App\Models\Umkm;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends AdminController
{
    public function __invoke(Request $request): Response
    {
        $metrics = [
            'counts' => [
                'spots' => Spot::query()->count(),
                'umkms' => Umkm::query()->count(),
                'events' => Event::query()->count(),
                'stories' => Story::query()->count(),
                'contributors' => User::query()->whereHas('roles')->count(),
            ],
            'recentStories' => Story::query()
                ->latest('created_at')
                ->take(5)
                ->get(['id', 'title', 'status', 'published_at']),
            'upcomingEvents' => Event::query()
                ->whereNotNull('start_at')
                ->orderBy('start_at')
                ->take(5)
                ->get(['id', 'title', 'status', 'start_at']),
            'currentStatus' => SiteStatus::query()
                ->current()
                ->first([
                    'crowd_level',
                    'weather_summary',
                    'temperature',
                    'is_raining',
                    'reported_at',
                    'valid_until',
                ]),
        ];

        return $this->inertia()->render('Admin/Dashboard/Index', [
            'metrics' => $metrics,
        ]);
    }
}
