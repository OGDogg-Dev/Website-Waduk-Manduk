import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { storageUrl } from '@/lib/storage';

interface UmkmCardProps {
    id: number;
    name: string;
    tagline?: string | null;
    category?: string | null;
    hero_image?: string | null;
    whatsapp_number?: string | null;
    maps_url?: string | null;
    is_featured?: boolean;
}

export function UmkmCard({ name, tagline, category, hero_image, whatsapp_number, maps_url, is_featured }: UmkmCardProps) {
    return (
        <Card className="h-full border-border/80">
            {storageUrl(hero_image) && (
                <div className="aspect-[3/2] overflow-hidden">
                    <img src={storageUrl(hero_image) ?? undefined} alt={name} className="h-full w-full object-cover" />
                </div>
            )}
            <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                    {category && <Badge variant="outline">{category}</Badge>}
                    {is_featured && <Badge variant="default">Sorotan</Badge>}
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                    {name}
                </CardTitle>
                {tagline && <CardDescription>{tagline}</CardDescription>}
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {whatsapp_number && (
                    <Button asChild size="sm" variant="secondary">
                        <a href={`https://wa.me/${whatsapp_number}`} target="_blank" rel="noreferrer">
                            Hubungi via WA
                        </a>
                    </Button>
                )}
                {maps_url && (
                    <Button asChild size="sm" variant="outline">
                        <a href={maps_url} target="_blank" rel="noreferrer">
                            Buka Maps
                        </a>
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
