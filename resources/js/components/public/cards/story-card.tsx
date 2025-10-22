import { storageUrl } from '@/lib/storage';
import { Card } from '@/components/public/Card';

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
    const publishedDate = published_at ? dateFormatter.format(new Date(published_at)) : null;

    return (
        <Card
            className={className}
            image={cover ?? undefined}
            alt={`Dokumentasi ${title}`}
            badge={type}
            title={title}
            href={route('stories.index', { highlight: slug })}
            excerpt={excerpt ?? undefined}
            meta={publishedDate ? <span className="text-xs uppercase tracking-[0.3em]">{publishedDate}</span> : undefined}
        />
    );
}
