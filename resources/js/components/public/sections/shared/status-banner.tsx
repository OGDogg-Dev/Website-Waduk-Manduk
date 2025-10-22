import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/public/StatusBadge';
import { AlertTriangle } from 'lucide-react';

interface StatusBannerProps {
    crowd_level?: string | null;
    weather_summary?: string | null;
    temperature?: string | null;
    advisory?: string | null;
    startLabel?: string;
    tone?: 'light' | 'dark';
}

type LevelStyle = { badge: 'normal' | 'tutup' | 'hati2'; label: string };

const levelStyles: Record<string, LevelStyle> = {
    sepi: { badge: 'normal', label: 'Sepi' },
    normal: { badge: 'normal', label: 'Normal' },
    ramai: { badge: 'hati2', label: 'Ramai' },
    padat: { badge: 'hati2', label: 'Padat' },
    ditutup: { badge: 'tutup', label: 'Ditutup' },
};

export function StatusBanner({
    crowd_level,
    weather_summary,
    temperature,
    advisory,
    startLabel = 'Status lokasi',
    tone = 'light',
}: StatusBannerProps) {
    if (!crowd_level && !weather_summary && !advisory) {
        return null;
    }

    const normalizedLevel = crowd_level?.toLowerCase() ?? '';
    const level: LevelStyle = levelStyles[normalizedLevel] ?? {
        badge: 'hati2',
        label: crowd_level ?? 'Tidak tersedia',
    };

    const containerClass =
        tone === 'dark'
            ? 'rounded-3xl border border-white/20 bg-white/10 p-6 text-on-media shadow-soft backdrop-blur'
            : 'rounded-3xl border border-surface-3/80 bg-surface-0 p-6 text-text-primary shadow-soft';

    const metaText = tone === 'dark' ? 'text-on-media-muted' : 'text-text-secondary';
    const advisoryText = tone === 'dark' ? 'text-accent-300' : 'text-accent-600';

    return (
        <div className={containerClass}>
            {crowd_level && (
                <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge variant={level.badge} label={startLabel} />
                    <span className="text-sm font-semibold">{level.label}</span>
                </div>
            )}
            {weather_summary && (
                <p className={cn('mt-4 text-sm leading-relaxed', metaText)}>
                    Cuaca: {weather_summary}
                    {temperature ? ` · ${temperature}` : ''}
                </p>
            )}
            {advisory && (
                <p className={cn('mt-3 flex items-center gap-2 text-sm font-semibold', advisoryText)}>
                    <AlertTriangle className="h-4 w-4" aria-hidden />
                    <span>{advisory}</span>
                </p>
            )}
        </div>
    );
}
