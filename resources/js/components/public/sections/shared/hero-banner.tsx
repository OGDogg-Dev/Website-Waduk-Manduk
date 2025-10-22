import type { ReactNode } from 'react';
import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface HeroBannerProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string | null;
    badgeText?: string;
    actions?: ReactNode;
    align?: 'left' | 'center';
    className?: string;
}

export function HeroBanner({
    title,
    subtitle,
    backgroundImage,
    badgeText = 'Ekowisata Waduk Manduk',
    actions,
    align = 'left',
    className,
}: HeroBannerProps) {
    const background = storageUrl(backgroundImage);

    return (
        <section
            className={cn(
                'relative overflow-hidden rounded-[40px] border border-white/15 bg-wave-gradient px-8 py-16 text-white shadow-reef sm:px-12 md:py-20',
                className,
            )}
        >
            {background && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(3,7,18,0.55), rgba(3,7,18,0.35) 55%, rgba(3,7,18,0)), url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        mixBlendMode: 'normal',
                    }}
                />
            )}
            <div className="pointer-events-none absolute inset-0">
                <svg className="h-full w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                        fill="url(#heroBannerWave)"
                        d="M0,96L48,85.3C96,75,192,53,288,90.7C384,128,480,224,576,229.3C672,235,768,149,864,149.3C960,149,1056,235,1152,240C1248,245,1344,171,1392,133.3L1440,96V320H0Z"
                    />
                    <defs>
                        <linearGradient id="heroBannerWave" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
                            <stop offset="50%" stopColor="rgba(242, 196, 109, 0.22)" />
                            <stop offset="100%" stopColor="rgba(209, 230, 255, 0.18)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className={cn('relative z-10 flex flex-col gap-6 text-balance', align === 'center' ? 'items-center text-center' : 'items-start text-left')}>
                {badgeText && (
                    <span className="inline-flex w-fit rounded-full bg-white/18 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-light">
                        {badgeText}
                    </span>
                )}
                <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.25rem)] font-bold leading-tight text-on-media md:text-[50px]">
                    {title}
                </h1>
                {subtitle && (
                    <p className="max-w-2xl text-base leading-relaxed text-on-media-muted md:text-lg">
                        {subtitle}
                    </p>
                )}
                {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
            </div>
        </section>
    );
}
