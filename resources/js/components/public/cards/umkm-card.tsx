import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
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
    products?: Array<{ name: string; price?: string }> | null;
    rating?: number | null;
    reviews_count?: number | null;
    className?: string;
}

export function UmkmCard({
    id,
    name,
    tagline,
    category,
    hero_image,
    whatsapp_number,
    maps_url,
    is_featured,
    products,
    rating,
    reviews_count,
    className,
}: UmkmCardProps) {
    const cover = storageUrl(hero_image);
    const formattedRating = typeof rating === 'number' ? rating.toFixed(1) : null;
    const reviewLabel = typeof reviews_count === 'number' ? `${reviews_count} ulasan` : 'Belum ada ulasan';
    const itineraryHref = `${route('visit.plan')}?umkm=${id}`;

    return (
        <article
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-3/60 bg-surface-0 p-6 text-text-primary shadow-soft transition hover:-translate-y-1 hover:border-brand-200',
                className,
            )}
        >
            <div className="relative mb-6 aspect-square overflow-hidden rounded-2xl">
                {cover ? (
                    <img
                        src={cover}
                        srcSet={`${cover}?w=320 320w, ${cover}?w=480 480w, ${cover}?w=640 640w`}
                        sizes="(max-width: 768px) 100vw, 320px"
                        loading="lazy"
                        decoding="async"
                        alt={`Produk UMKM ${name}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-900/80 via-brand-700/70 to-brand-900/90">
                        <span className="text-sm font-semibold text-white/80">Foto segera hadir</span>
                    </div>
                )}
                {!cover && (
                    <div className="absolute inset-0 animate-pulse bg-brand-900/40" aria-hidden />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-overlay-scrim-48 via-overlay-scrim-32 to-transparent" aria-hidden />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    {category && <span className="chip bg-accent-500 text-on-dark">{category}</span>}
                    {is_featured && <span className="chip bg-brand-500 text-on-dark">Sorotan</span>}
                </div>
                {formattedRating && (
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                        <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                        {formattedRating}
                        <span className="text-white/70">({reviewLabel})</span>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col gap-3">
                <h3 className="text-h3 text-text-primary line-2">{name}</h3>
                {tagline && <p className="text-sm text-text-secondary line-3">{tagline}</p>}
                {products && products.length > 0 && (
                    <p className="text-xs text-text-secondary">
                        Produk unggulan: {products.slice(0, 2).map((product) => product.name).join(', ')}
                    </p>
                )}
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
                    <Link
                        href={itineraryHref}
                        className="focus-ring inline-flex items-center justify-center rounded-full border border-brand-200 px-5 py-2 text-text-primary transition hover:border-brand-400 hover:text-brand-600"
                    >
                        Tambah ke itinerary
                    </Link>
                </div>
            </div>
        </article>
    );
}
