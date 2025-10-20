<?php

namespace App\Http\Controllers\Web;

use App\Enums\StoryType;
use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoryController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $type = $request->string('type')->toString() ?: null;

        $query = Story::query()
            ->published()
            ->orderByDesc('published_at');

        if ($type) {
            $query->where('type', $type);
        }

        $stories = $query->paginate(9)->withQueryString();

        return Inertia::render('Public/Stories/Index', [
            'stories' => $stories,
            'filters' => [
                'type' => $type,
            ],
            'types' => collect(StoryType::cases())->map(fn (StoryType $storyType) => [
                'value' => $storyType->value,
                'label' => $storyType->label(),
            ]),
            'featured' => Story::query()
                ->published()
                ->orderByDesc('published_at')
                ->take(3)
                ->get([
                    'id',
                    'title',
                    'slug',
                    'excerpt',
                    'hero_image',
                    'published_at',
                    'type',
                ]),
        ]);
    }
}
