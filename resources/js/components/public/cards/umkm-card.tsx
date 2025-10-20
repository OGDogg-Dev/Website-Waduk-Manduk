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
                'group flex h-full flex-col overflow-hidden rounded-3xl border border-deep-navy/10 bg-white p-6 text-deep-navy shadow-reef/20 transition hover:-translate-y-1 hover:shadow-reef',
                className,
            )}
        >
            {cover && (
                <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                    <img
                        src={cover}
                        alt={name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                        {category && (
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-deep-navy">
                                {category}
                            </span>
                        )}
                        {is_featured && (
                            <span className="rounded-full bg-gold-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-deep-navy">
                                Sorotan
                            </span>
                        )}
                    </div>
                </div>
            )}
            <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-xl font-semibold leading-tight">{name}</h3>
                {tagline && <p className="text-sm text-deep-navy/70">{tagline}</p>}
                <div className="mt-auto grid gap-2 text-sm font-medium">
                    {whatsapp_number && (
                        <a
                            href={`https://wa.me/${whatsapp_number}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full bg-gold-accent px-5 py-2 text-deep-navy transition hover:bg-gold-accent/90"
                        >
                            Hubungi via WA
                        </a>
                    )}
                    {maps_url && (
                        <a
                            href={maps_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-deep-navy/15 px-5 py-2 text-deep-navy transition hover:border-gold-accent hover:text-gold-accent"
                        >
                            Buka Maps
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
