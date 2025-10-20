import { cn } from '@/lib/utils';

interface StatusBannerProps {
    crowd_level?: string | null;
    weather_summary?: string | null;
    temperature?: string | null;
    advisory?: string | null;
    startLabel?: string;
}

const levelColor: Record<string, string> = {
    sepi: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
    normal: 'bg-sky-500/15 text-sky-600 dark:text-sky-300',
    ramai: 'bg-amber-500/15 text-amber-600 dark:text-amber-300',
    ditutup: 'bg-red-500/15 text-red-600 dark:text-red-400',
};

export function StatusBanner({ crowd_level, weather_summary, temperature, advisory, startLabel = 'Status lokasi' }: StatusBannerProps) {
    if (!crowd_level && !weather_summary && !advisory) {
        return null;
    }

    return (
        <div className="rounded-2xl border border-border bg-muted/30 p-4">
            {crowd_level && (
                <p className={cn('w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', levelColor[crowd_level] ?? 'bg-primary/10 text-primary')}>
                    {startLabel}: {crowd_level}
                </p>
            )}
            {weather_summary && (
                <p className="mt-2 text-sm text-muted-foreground">
                    Cuaca: {weather_summary}
                    {temperature ? ` • ${temperature}` : ''}
                </p>
            )}
            {advisory && (
                <p className="mt-2 text-sm text-primary">{advisory}</p>
            )}
        </div>
    );
}
