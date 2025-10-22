import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface UmkmCardProps {
    id: number;
    name: string;
    tagline?: string | null;
    category?: string | null;
    hero_image?: string | null;
    whatsapp_number?: string | null;
    maps_url?: string | null;
    is_featured?: boolean;
    className?: string;
}

export function UmkmCard({
    name,
    tagline,
    category,
    hero_image,
    whatsapp_number,
    maps_url,
    is_featured,
    className,
}: UmkmCardProps) {
    const cover = storageUrl(hero_image);

    return (
        <article
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-3/60 bg-surface-0 p-6 text-text-primary shadow-soft transition hover:-translate-y-1 hover:border-brand-200',
                className,
            )}
        >
            {cover && (
                <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl">
                    <img
                        src={cover}
                        alt={`Produk UMKM ${name}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay-scrim-48 via-overlay-scrim-32 to-transparent" aria-hidden />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {category && (
                            <span className="chip bg-accent-500 text-on-dark">{category}</span>
                        )}
                        {is_featured && (
                            <span className="chip bg-brand-500 text-on-dark">Sorotan</span>
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-h3 text-text-primary line-2">{name}</h3>
                {tagline && <p className="text-sm text-text-secondary line-3">{tagline}</p>}
                <div className="mt-auto grid gap-2 text-sm font-medium">
                    {whatsapp_number && (
                        <a
                            href={`https://wa.me/${whatsapp_number}`}
                            target="_blank"
                            rel="noreferrer"
                            className="focus-ring inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-2 text-on-dark transition hover:bg-accent-400"
                        >
                            Hubungi via WA
                        </a>
                    )}
                    {maps_url && (
                        <a
                            href={maps_url}
                            target="_blank"
                            rel="noreferrer"
                            className="focus-ring inline-flex items-center justify-center rounded-full border border-brand-200 px-5 py-2 text-text-primary transition hover:border-brand-400 hover:text-brand-600"
                        >
                            Buka Maps
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
