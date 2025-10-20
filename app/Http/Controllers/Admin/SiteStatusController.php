<?php

namespace App\Http\Controllers\Admin;

use App\Enums\CrowdLevel;
use App\Http\Requests\Admin\SiteStatus\SiteStatusStoreRequest;
use App\Http\Requests\Admin\SiteStatus\SiteStatusUpdateRequest;
use App\Models\SiteStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class SiteStatusController extends AdminController
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['crowd_level', 'current']);

        $siteStatuses = SiteStatus::query()
            ->with(['reporter:id,name'])
            ->when($filters['crowd_level'] ?? null, fn ($query, $value) => $query->where('crowd_level', $value))
            ->when(
                $filters['current'] ?? null,
                fn ($query) => $query->where('is_current', true)
            )
            ->latest('reported_at')
            ->paginate(15)
            ->withQueryString();

        return $this->inertia()->render('Admin/SiteStatuses/Index', [
            'filters' => $filters,
            'collection' => $siteStatuses->through(
                fn (SiteStatus $siteStatus) => [
                    'id' => $siteStatus->id,
                    'crowd_level' => $siteStatus->crowd_level->value,
                    'weather_summary' => $siteStatus->weather_summary,
                    'is_current' => $siteStatus->is_current,
                    'reported_at' => optional($siteStatus->reported_at)->toIso8601String(),
                    'valid_until' => optional($siteStatus->valid_until)->toIso8601String(),
                    'reporter' => $siteStatus->reporter?->name,
                ]
            ),
            'options' => $this->formOptions(),
        ]);
    }

    public function create(): Response
    {
        return $this->inertia()->render('Admin/SiteStatuses/Form', [
            'status' => null,
            'options' => $this->formOptions(),
        ]);
    }

    public function store(SiteStatusStoreRequest $request): RedirectResponse
    {
        $isCurrent = $request->boolean('is_current', true);

        if ($isCurrent) {
            SiteStatus::query()->update(['is_current' => false]);
        }

        SiteStatus::query()->create([
            ...$request->validatedPayload(),
            'is_current' => $isCurrent,
            'reported_by' => $request->user()?->id,
        ]);

        return redirect()
            ->route('admin.site-statuses.index')
            ->with('success', 'Status lokasi berhasil diperbarui.');
    }

    public function edit(SiteStatus $siteStatus): Response
    {
        return $this->inertia()->render('Admin/SiteStatuses/Form', [
            'status' => $siteStatus->toArray(),
            'options' => $this->formOptions(),
        ]);
    }

    public function update(SiteStatusUpdateRequest $request, SiteStatus $siteStatus): RedirectResponse
    {
        $isCurrent = $request->has('is_current')
            ? $request->boolean('is_current')
            : $siteStatus->is_current;

        if ($request->has('is_current') && $isCurrent) {
            SiteStatus::query()
                ->where('id', '<>', $siteStatus->id)
                ->update(['is_current' => false]);
        }

        $payload = $request->validatedPayload();
        if ($request->has('is_current')) {
            $payload['is_current'] = $isCurrent;
        }

        $siteStatus->update([
            ...$payload,
            'reported_by' => $request->user()?->id,
        ]);

        return redirect()
            ->route('admin.site-statuses.edit', $siteStatus)
            ->with('success', 'Status lokasi berhasil diperbarui.');
    }

    public function destroy(SiteStatus $siteStatus): RedirectResponse
    {
        $siteStatus->delete();

        return redirect()
            ->route('admin.site-statuses.index')
            ->with('success', 'Status lokasi berhasil dihapus.');
    }

    private function formOptions(): array
    {
        return [
            'crowdLevels' => collect(CrowdLevel::cases())->map(fn ($level) => [
                'value' => $level->value,
                'label' => $level->label(),
            ])->values()->all(),
        ];
    }
}
