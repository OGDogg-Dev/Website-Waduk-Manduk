import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

interface SpotCardProps {
    id: number;
    name: string;
    slug?: string | null;
    type: string;
    headline?: string | null;
    description?: string | null;
    hero_image?: string | null;
    className?: string;
}

export function SpotCard({ name, slug, type, headline, description, hero_image, className }: SpotCardProps) {
    const href = slug ? route('explore.index', { focus: slug }) : route('explore.index');
    const cover = storageUrl(hero_image);

    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-3xl bg-white text-deep-navy shadow-reef/30 transition hover:-translate-y-1 hover:shadow-reef',
                className,
            )}
        >
            {cover && (
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={cover}
                        alt={name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <span className="absolute left-5 top-5 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-deep-navy">
                        {type}
                    </span>
                </div>
            )}
            <div className="flex flex-col gap-3 px-6 pb-6 pt-5">
                <h3 className="text-xl font-semibold leading-snug">{name}</h3>
                {headline && <p className="text-sm font-medium text-gold-accent">{headline}</p>}
                {description && <p className="text-sm text-deep-navy/70 line-clamp-3">{description}</p>}
                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-deep-navy hover:text-gold-accent"
                >
                    Lihat detail
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </article>
    );
}
