import { cn } from '@/lib/utils';

interface StatusBannerProps {
    crowd_level?: string | null;
    weather_summary?: string | null;
    temperature?: string | null;
    advisory?: string | null;
    startLabel?: string;
}

const levelColor: Record<string, string> = {
    sepi: 'bg-emerald-400/10 text-emerald-200',
    normal: 'bg-sky-400/15 text-sky-100',
    ramai: 'bg-amber-400/15 text-amber-100',
    ditutup: 'bg-red-500/15 text-red-100',
};

export function StatusBanner({ crowd_level, weather_summary, temperature, advisory, startLabel = 'Status lokasi' }: StatusBannerProps) {
    if (!crowd_level && !weather_summary && !advisory) {
        return null;
    }

    return (
        <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 text-white shadow-reef">
            {crowd_level && (
                <p
                    className={cn(
                        'w-fit rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]',
                        levelColor[crowd_level] ?? 'bg-white/15 text-white',
                    )}
                >
                    {startLabel}: {crowd_level}
                </p>
            )}
            {weather_summary && (
                <p className="mt-4 text-sm text-white/75">
                    Cuaca: {weather_summary}
                    {temperature ? `  ${temperature}` : ''}
                </p>
            )}
            {advisory && (
                <p className="mt-3 text-sm font-semibold text-gold-accent">{advisory}</p>
            )}
        </div>
    );
}
