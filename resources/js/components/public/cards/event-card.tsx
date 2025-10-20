import { CalendarDays, MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface EventCardProps {
    id: number;
    title: string;
    slug?: string | null;
    tagline?: string | null;
    start_at?: string | null;
    event_type?: string | null;
    location?: string | null;
    cover_image?: string | null;
    className?: string;
}

const formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
});

export function EventCard({
    title,
    slug,
    tagline,
    start_at,
    event_type,
    location,
    cover_image,
    className,
}: EventCardProps) {
    const cover = storageUrl(cover_image);

    return (
        <article
            className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg transition hover:-translate-y-1 hover:border-gold-accent/70',
                className,
            )}
        >
            {cover && (
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    {event_type && (
                        <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-deep-navy">
                            {event_type}
                        </span>
                    )}
                </div>
            )}
            <div className="flex flex-1 flex-col gap-4 p-6 text-white">
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold leading-tight">
                        {title}
                    </h3>
                    {tagline && <p className="text-sm text-white/70">{tagline}</p>}
                </div>
                <div className="mt-auto space-y-3 text-sm text-white/80">
                    {start_at && (
                        <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-gold-accent" />
                            {formatter.format(new Date(start_at))}
                        </p>
                    )}
                    {location && (
                        <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gold-accent" />
                            {location}
                        </p>
                    )}
                </div>
                {slug && (
                    <Link
                        href={route('visit.plan', { highlight: slug })}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gold-accent transition group-hover:gap-3"
                    >
                        Detail kegiatan
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                )}
            </div>
        </article>
    );
}
