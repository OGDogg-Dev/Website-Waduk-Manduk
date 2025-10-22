<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class QrisController extends Controller
{
    public function __invoke(): Response
    {
        $config = collect(config('qris'));

        return Inertia::render('Public/Qris/Index', [
            'hero' => [
                'title' => $config->get('hero.title'),
                'subtitle' => $config->get('hero.subtitle'),
                'highlight' => $config->get('hero.highlight'),
            ],
            'downloads' => $this->mapDownloads($config->get('downloads', [])),
            'steps' => $this->mapContentItems($config->get('steps', [])),
            'faq' => $this->mapContentItems($config->get('faq', [])),
            'contacts' => $this->mapContacts($config->get('contacts', [])),
            'disclaimer' => $config->get('disclaimer'),
        ]);
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @return array<int, array<string, mixed>>
     */
    private function mapDownloads(array $items): array
    {
        return collect($items)
            ->map(static function (array $download): array {
                $path = Arr::get($download, 'path');

                return [
                    'label' => Arr::get($download, 'label'),
                    'url' => $path ? asset($path) : null,
                    'format' => Arr::get($download, 'format'),
                    'size' => Arr::get($download, 'size'),
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @param  array<int, array<string, mixed>>  $items
     * @return array<int, array<string, mixed>>
     */
    private function mapContentItems(array $items): array
    {
        return collect($items)
            ->map(static function (array $item): array {
                return [
                    'title' => Arr::get($item, 'title'),
                    'description' => Arr::get($item, 'description') ?? Arr::get($item, 'answer'),
                    'question' => Arr::get($item, 'question'),
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @param  array<int, array<string, mixed>>  $contacts
     * @return array<int, array<string, mixed>>
     */
    private function mapContacts(array $contacts): array
    {
        return collect($contacts)
            ->map(static function (array $contact): array {
                return [
                    'label' => Arr::get($contact, 'label'),
                    'value' => Arr::get($contact, 'value'),
                    'href' => Arr::get($contact, 'href'),
                    'type' => Arr::get($contact, 'type'),
                ];
            })
            ->values()
            ->all();
    }
}
