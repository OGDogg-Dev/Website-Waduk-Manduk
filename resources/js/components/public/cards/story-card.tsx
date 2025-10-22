import { storageUrl } from '@/lib/storage';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface StoryCardProps {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    hero_image?: string | null;
    type: string;
    published_at?: string | null;
    className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
});

export function StoryCard({ title, slug, excerpt, hero_image, type, published_at, className }: StoryCardProps) {
    const cover = storageUrl(hero_image);

    return (
        <article
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/12 p-6 text-on-media backdrop-blur transition hover:-translate-y-1 hover:border-gold-accent/70',
                className,
            )}
        >
            {cover && (
                <div className="relative mb-6 aspect-[3/2] overflow-hidden rounded-2xl">
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 inline-flex rounded-full bg-brand-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                        {type}
                    </span>
                </div>
            )}
            <div className="flex flex-1 flex-col gap-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold leading-snug text-on-media">{title}</h3>
                    {published_at && (
                        <p className="text-xs uppercase tracking-[0.25em] text-on-media-muted">
                            {dateFormatter.format(new Date(published_at))}
                        </p>
                    )}
                    {excerpt && <p className="text-sm leading-relaxed text-on-media-muted line-clamp-3">{excerpt}</p>}
                </div>
                <Link
                    href={route('stories.index', { highlight: slug })}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-primary underline-offset-4 transition hover:underline focus-visible-outline group-hover:gap-3"
                >
                    Baca selengkapnya
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
            </div>
        </article>
    );
}
