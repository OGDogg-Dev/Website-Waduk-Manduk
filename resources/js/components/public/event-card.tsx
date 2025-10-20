import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { storageUrl } from '@/lib/storage';
import { Link } from '@inertiajs/react';

interface EventCardProps {
    id: number;
    title: string;
    slug?: string | null;
    tagline?: string | null;
    start_at?: string | null;
    event_type?: string | null;
    location?: string | null;
    cover_image?: string | null;
}

const formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
});

export function EventCard({ title, slug, tagline, start_at, event_type, location, cover_image }: EventCardProps) {
    const cover = storageUrl(cover_image);

    return (
        <Card className="h-full overflow-hidden border-border/80">
            {cover && (
                <div className="aspect-[3/2] overflow-hidden">
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
                    />
                </div>
            )}
            <CardHeader>
                {event_type && (
                    <Badge variant="outline" className="w-fit uppercase tracking-wide">
                        {event_type}
                    </Badge>
                )}
                <CardTitle className="text-lg font-semibold text-foreground">
                    {title}
                </CardTitle>
                {tagline && <p className="text-sm text-muted-foreground">{tagline}</p>}
                {start_at && (
                    <p className="text-sm text-muted-foreground">
                        {formatter.format(new Date(start_at))}
                    </p>
                )}
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                {location && <p className="mb-3 font-medium text-foreground">Lokasi: <span className="font-normal text-muted-foreground">{location}</span></p>}
                {slug && (
                    <Link
                        href={route('visit.plan', { highlight: slug })}
                        className="font-medium text-primary hover:underline"
                    >
                        Detail kegiatan
                    </Link>
                )}
            </CardContent>
        </Card>
    );
}
