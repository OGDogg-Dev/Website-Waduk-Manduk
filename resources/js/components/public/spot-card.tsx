import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { storageUrl } from '@/lib/storage';
import { Link } from '@inertiajs/react';

interface SpotCardProps {
    id: number;
    name: string;
    slug?: string | null;
    type: string;
    headline?: string | null;
    description?: string | null;
    hero_image?: string | null;
}

export function SpotCard({ id, name, slug, type, headline, description, hero_image }: SpotCardProps) {
    const href = slug ? route('explore.index', { focus: slug }) : route('explore.index');

    return (
        <Card className="group h-full overflow-hidden border-border/80 transition hover:border-primary/60 hover:shadow-md">
            {storageUrl(hero_image) && (
                <div className="aspect-[3/2] overflow-hidden">
                    <img
                        src={storageUrl(hero_image) ?? undefined}
                        alt={name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <CardHeader className="space-y-2">
                <Badge variant="outline" className="w-fit uppercase tracking-wide">
                    {type}
                </Badge>
                <CardTitle className="text-lg font-semibold text-foreground">
                    {name}
                </CardTitle>
                {headline && <CardDescription>{headline}</CardDescription>}
            </CardHeader>
            {description && (
                <CardContent className="text-sm text-muted-foreground">
                    <p className="line-clamp-3">{description}</p>
                    <Link
                        href={href}
                        className="mt-3 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                        Lihat detail
                    </Link>
                </CardContent>
            )}
        </Card>
    );
}
