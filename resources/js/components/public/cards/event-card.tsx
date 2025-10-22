import { CalendarDays, MapPin } from 'lucide-react';
import { storageUrl } from '@/lib/storage';
import { Card } from '@/components/public/Card';

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
    const startDate = start_at ? formatter.format(new Date(start_at)) : null;

    return (
        <Card
            className={className}
            image={cover ?? undefined}
            alt={`Poster kegiatan ${title}`}
            badge={event_type ?? undefined}
            title={title}
            href={slug ? route('visit.plan', { highlight: slug }) : route('visit.plan')}
            excerpt={tagline ?? undefined}
            actionLabel="Detail kegiatan"
            meta={
                <>
                    {startDate && (
                        <p className="flex items-center gap-2 text-text-secondary">
                            <CalendarDays className="h-4 w-4 text-brand-500" aria-hidden />
                            <span>{startDate}</span>
                        </p>
                    )}
                    {location && (
                        <p className="flex items-center gap-2 text-text-secondary">
                            <MapPin className="h-4 w-4 text-brand-500" aria-hidden />
                            <span>{location}</span>
                        </p>
                    )}
                </>
            }
        />
    );
}
