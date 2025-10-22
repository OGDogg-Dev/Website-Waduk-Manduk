<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\SiteStatus;
use App\Models\Spot;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class VisitController extends Controller
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
                'category',
                'headline',
                'description',
                'hero_image',
                'latitude',
                'longitude',
            ]);

        return Inertia::render('Public/Fasilitas/Index', [
            'status' => SiteStatus::query()->current()->first(),
            'spots' => $spots,
            'groupedSpots' => $spots->groupBy('type')->map(function (Collection $items) {
                return $items->values();
            }),
            'upcomingEvents' => Event::query()
                ->published()
                ->whereNotNull('start_at')
                ->orderBy('start_at')
                ->take(5)
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
            'visitTips' => [
                'Gunakan jalur resmi dan patuhi rambu interpretasi.',
                'Bawa tumbler dan kantong sampah sendiri untuk meminimalkan sampah plastik.',
                'Selalu utamakan keselamatan, terutama saat cuaca berubah cepat.',
                'Dukung UMKM lokal dengan membeli produk langsung di lokasi.',
            ],
        ]);
    }
}
