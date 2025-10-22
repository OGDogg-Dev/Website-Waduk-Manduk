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
    const hasSchedule = Boolean(start_at);

    const handleAddToCalendar = () => {
        if (!start_at) {
            return;
        }

        const start = new Date(start_at);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        const formatIcsDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Waduk Manduk//Agenda//ID',
            'BEGIN:VEVENT',
            `UID:${(slug ?? `${title}-${start.getTime()}`).replace(/\s+/g, '-')}`,
            `DTSTAMP:${formatIcsDate(new Date())}`,
            `DTSTART:${formatIcsDate(start)}`,
            `DTEND:${formatIcsDate(end)}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${(tagline ?? '').replace(/\n/g, ' ')}`,
            `LOCATION:${(location ?? 'Waduk Manduk').replace(/\n/g, ' ')}`,
            'END:VEVENT',
            'END:VCALENDAR',
        ];
        const icsContent = icsLines.join('\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `${(slug ?? title).toString().replace(/\s+/g, '-').toLowerCase()}.ics`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        URL.revokeObjectURL(url);
    };

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
                    <button
                        type="button"
                        onClick={handleAddToCalendar}
                        disabled={!hasSchedule}
                        className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full border border-brand-200 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 transition hover:border-brand-400 hover:text-brand-900 disabled:cursor-not-allowed disabled:border-muted disabled:text-muted"
                    >
                        Tambah ke Kalender (ICS)
                    </button>
                </>
            }
        />
    );
}
