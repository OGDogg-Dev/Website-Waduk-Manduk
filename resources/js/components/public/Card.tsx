import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
    image?: string | null;
    alt?: string;
    badge?: string | ReactNode;
    title: string;
    href: string;
    excerpt?: string | null;
    meta?: ReactNode;
    actionLabel?: string;
    className?: string;
    tone?: 'light' | 'dark';
}

export function Card({
    image,
    alt,
    badge,
    title,
    href,
    excerpt,
    meta,
    actionLabel = 'Pelajari lebih lanjut',
    className,
    tone = 'light',
}: CardProps) {
    return (
        <article
            className={cn(
                'group flex h-full flex-col overflow-hidden rounded-3xl p-4 shadow-soft transition hover:-translate-y-1',
                tone === 'dark'
                    ? 'border border-white/10 bg-white/5 text-on-media hover:border-white/25'
                    : 'border border-surface-3/60 bg-surface-0 hover:border-brand-200',
                className,
            )}
        >
            {image && (
                <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl">
                    <img
                        src={image}
                        loading="lazy"
                        decoding="async"
                        alt={alt ?? title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {badge && (
                        <span className="chip absolute left-4 top-4">{badge}</span>
                    )}
                </div>
            )}
            <div className="flex flex-1 flex-col gap-3">
                <h3 className={cn('text-h3 line-2', tone === 'dark' ? 'text-on-media' : 'text-text-primary')}>{title}</h3>
                {meta && (
                    <div className={cn('space-y-2 text-sm', tone === 'dark' ? 'text-on-media-muted' : 'text-text-muted')}>
                        {meta}
                    </div>
                )}
                {excerpt && (
                    <p className={cn('text-sm line-3', tone === 'dark' ? 'text-on-media-muted' : 'text-text-secondary')}>
                        {excerpt}
                    </p>
                )}
                <a
                    href={href}
                    className={cn(
                        'focus-ring mt-auto inline-flex items-center gap-2 text-sm transition',
                        tone === 'dark' ? 'text-on-media hover:text-accent-300' : 'link',
                    )}
                >
                    {actionLabel}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </a>
            </div>
        </article>
    );
}
