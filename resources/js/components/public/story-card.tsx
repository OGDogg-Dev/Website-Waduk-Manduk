import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { storageUrl } from '@/lib/storage';
import { Link } from '@inertiajs/react';

interface StoryCardProps {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    hero_image?: string | null;
    type: string;
    published_at?: string | null;
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

export function StoryCard({ title, slug, excerpt, hero_image, type, published_at }: StoryCardProps) {
    return (
        <Card className="group h-full overflow-hidden border-border/80 transition hover:border-primary/60 hover:shadow-md">
            {storageUrl(hero_image) && (
                <div className="aspect-[3/2] overflow-hidden">
                    <img
                        src={storageUrl(hero_image) ?? undefined}
                        alt={title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <CardHeader className="space-y-2">
                <Badge variant="outline" className="w-fit uppercase tracking-wide">
                    {type}
                </Badge>
                <CardTitle className="text-lg font-semibold text-foreground">
                    {title}
                </CardTitle>
                {published_at && (
                    <p className="text-xs text-muted-foreground">
                        {dateFormatter.format(new Date(published_at))}
                    </p>
                )}
                {excerpt && <CardDescription>{excerpt}</CardDescription>}
            </CardHeader>
            <CardContent>
                <Link
                    href={route('stories.index', { highlight: slug })}
                    className="text-sm font-medium text-primary hover:underline"
                >
                    Baca selengkapnya
                </Link>
            </CardContent>
        </Card>
    );
}
