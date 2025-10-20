<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Inertia\Inertia;
use Inertia\Response;

class SupportController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Support/Index', [
            'supportChannels' => [
                [
                    'title' => 'Dukungan Dana',
                    'description' => 'Salurkan donasi melalui QRIS resmi atau rekening komunitas untuk mendukung pemeliharaan fasilitas.',
                    'qrisImage' => '/images/support/qris-waduk-manduk.png',
                    'account' => [
                        'bank' => 'Bank Jatim',
                        'number' => '1234-567-890',
                        'name' => 'Komunitas Sahabat Manduk',
                    ],
                ],
                [
                    'title' => 'Relawan Lapangan',
                    'description' => 'Ikut serta dalam program reresik waduk, tur edukasi, dan monitoring satwa.',
                    'contact' => 'Whatsapp 0813-1122-3344 (Koordinator Relawan)',
                ],
                [
                    'title' => 'Kolaborasi Program',
                    'description' => 'Buka peluang kolaborasi untuk edukasi, riset, dan pemberdayaan warga sekitar.',
                    'email' => 'halo@wadukmanduk.id',
                ],
            ],
            'stories' => Story::query()
                ->published()
                ->orderByDesc('published_at')
                ->take(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'hero_image',
                    'excerpt',
                    'published_at',
                ]),
        ]);
    }
}
