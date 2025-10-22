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
                'group overflow-hidden rounded-3xl border border-surface-3/60 bg-surface-0 text-text-primary shadow-soft transition hover:-translate-y-1 hover:border-brand-200',
                className,
            )}
        >
            {cover && (
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={cover}
                        alt={`Spot wisata ${name}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay-scrim-60 via-overlay-scrim-32 to-transparent" aria-hidden />
                    <span className="chip absolute left-4 top-4 bg-accent-500 text-on-dark">{type}</span>
                </div>
            )}
            <div className="flex flex-col gap-3 px-5 pb-6 pt-5">
                <h3 className="text-h3 text-text-primary line-2">{name}</h3>
                {headline && <p className="text-sm font-semibold text-brand-500 line-2">{headline}</p>}
                {description && <p className="text-sm text-text-secondary line-3">{description}</p>}
                <Link href={href} className="link focus-ring mt-auto inline-flex items-center gap-2 text-sm">
                    Lihat detail
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </article>
    );
}
