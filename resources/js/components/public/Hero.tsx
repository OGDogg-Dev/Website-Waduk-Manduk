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
        <section className="relative isolate overflow-hidden bg-brand-900 scrim-hero pb-24 text-on-media lg:pb-32 mb-[-6rem] lg:mb-[-8rem]">
            <div className="hero-decor" aria-hidden />
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
            <div className="hero-wave" aria-hidden>
                <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        d="M0,192L60,202.7C120,213,240,235,360,224C480,213,600,171,720,154.7C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        fill="rgba(3,32,72,0.55)"
                    />
                    <path
                        d="M0,256L60,245.3C120,235,240,213,360,208C480,203,600,213,720,213.3C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        fill="rgba(47,173,166,0.6)"
                    />
                    <path
                        d="M0,288L60,288C120,288,240,288,360,272C480,256,600,224,720,224C840,224,960,256,1080,272C1200,288,1320,288,1380,288L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                        fill="var(--surface-0)"
                    />
                </svg>
            </div>
        </section>
    );
}
