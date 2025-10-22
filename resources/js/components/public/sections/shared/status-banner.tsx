import type { ComponentType } from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, CircleDashed, CircleSlash } from 'lucide-react';

interface StatusBannerProps {
    crowd_level?: string | null;
    weather_summary?: string | null;
    temperature?: string | null;
    advisory?: string | null;
    startLabel?: string;
    tone?: 'light' | 'dark';
}

type LevelStyle = { chip: string; icon: ComponentType<{ className?: string }>; label: string };

const levelStyles: Record<string, LevelStyle> = {
    sepi: { chip: 'bg-emerald-600 text-white', icon: CheckCircle2, label: 'Sepi' },
    normal: { chip: 'bg-sky-600 text-white', icon: CheckCircle2, label: 'Normal' },
    ramai: { chip: 'bg-amber-600 text-white', icon: AlertCircle, label: 'Ramai' },
    ditutup: { chip: 'bg-red-600 text-white', icon: CircleSlash, label: 'Ditutup' },
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
        chip: tone === 'dark' ? 'bg-white/20 text-on-media' : 'bg-[color:var(--surface/2)] text-[color:var(--text/primary)]',
        icon: CircleDashed,
        label: crowd_level ?? 'Tidak tersedia',
    };

    const containerClass =
        tone === 'dark'
            ? 'rounded-[32px] border border-white/18 bg-white/12 p-6 text-on-media shadow-reef'
            : 'rounded-[28px] border border-[color:rgba(15,76,129,0.16)] bg-[color:var(--surface/0)] p-6 text-[color:var(--text/primary)] shadow-reef/10';

    const metaText = tone === 'dark' ? 'text-on-media-muted' : 'text-muted-strong';
    const advisoryText = tone === 'dark' ? 'text-gold-accent' : 'text-[color:var(--accent/600)]';

    return (
        <div className={containerClass}>
            {crowd_level && (
                <div className="flex flex-wrap items-center gap-3">
                    <span className={cn('inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em]', level.chip)}>
                        <level.icon className="h-3.5 w-3.5" aria-hidden />
                        <span className="sr-only">{startLabel}:</span>
                        <span>{startLabel}</span>
                    </span>
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
                <p className={cn('mt-3 text-sm font-semibold', advisoryText)}>{advisory}</p>
            )}
        </div>
    );
}
