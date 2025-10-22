import { cn } from '@/lib/utils';
import type { ReactNode, SourceHTMLAttributes } from 'react';

interface HeroAction {
    label: string;
    href: string;
    icon?: ReactNode;
    variant?: 'primary' | 'ghost';
    target?: string;
    rel?: string;
    className?: string;
}

type HeroSource = Pick<SourceHTMLAttributes<HTMLSourceElement>, 'srcSet' | 'media' | 'type'>;

interface HeroProps {
    image: string;
    imageSrcSet?: string;
    imageSizes?: string;
    sources?: HeroSource[];
    alt: string;
    title: string;
    subtitle?: string;
    eyebrow?: string;
    actions?: HeroAction[];
    children?: ReactNode;
}

export function Hero({
    image,
    imageSrcSet,
    imageSizes = '100vw',
    sources,
    alt,
    title,
    subtitle,
    eyebrow,
    actions,
    children,
}: HeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-brand-900 scrim-hero text-on-media">
            <picture className="absolute inset-0 -z-20 block h-full w-full">
                {sources?.map((source) => (
                    <source key={`${source.srcSet}-${source.media ?? 'all'}`} {...source} />
                ))}
                <img
                    src={image}
                    srcSet={imageSrcSet}
                    sizes={imageSizes}
                    alt={alt}
                    decoding="async"
                    loading="eager"
                    fetchpriority="high"
                    className="h-full w-full object-cover"
                />
            </picture>
            <div className="absolute inset-0 -z-10 bg-brand-900/40" aria-hidden />
            <div className="relative z-10">
                <div className="container flex flex-col gap-10 py-16 lg:py-24">
                    <div className="max-w-3xl space-y-6 on-media">
                        {eyebrow && (
                            <span className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em]">
                                {eyebrow}
                            </span>
                        )}
                        <h1 className="font-semibold leading-tight">{title}</h1>
                        {subtitle && (
                            <p className="max-w-2xl text-lg text-[color:var(--text-on-media-muted)]">{subtitle}</p>
                        )}
                        {actions && actions.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {actions.map(({ label, href, icon, variant = 'primary', target, rel, className }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={target}
                                        rel={rel}
                                        className={cn(
                                            'focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition',
                                            variant === 'primary'
                                                ? 'bg-accent-500 text-on-dark shadow-soft hover:bg-accent-400'
                                                : 'btn-ghost',
                                            className,
                                        )}
                                    >
                                        {icon}
                                        <span>{label}</span>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </section>
    );
}
