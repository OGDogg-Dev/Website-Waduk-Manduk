import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroAction {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
    external?: boolean;
}

interface HeroStat {
    label: string;
    value: string;
    description?: string;
}

interface HeroQuickHelpItem {
    href: string;
    title: string;
    description: string;
}

interface HeroQuickHelpCTA {
    label: string;
    href: string;
    description?: string;
}

interface PageHeroProps {
    eyebrow: string;
    title: string;
    description: string;
    badge?: string;
    actions?: HeroAction[];
    stats?: HeroStat[];
    quickHelpItems: HeroQuickHelpItem[];
    quickHelpHeading?: string;
    quickHelpDescription?: string;
    quickHelpCta?: HeroQuickHelpCTA;
    children?: ReactNode;
}

const heroDecorations = [
    'absolute inset-x-[-30%] top-[-18rem] h-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(45,171,255,0.22),_rgba(3,16,41,0))] blur-3xl',
    'absolute inset-x-[-40%] bottom-[-26rem] h-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(12,59,139,0.32),_rgba(1,8,20,0))] blur-[140px]',
];

export function PageHero({
    eyebrow,
    title,
    description,
    badge,
    actions = [],
    stats = [],
    quickHelpItems,
    quickHelpHeading = 'Bantuan cepat',
    quickHelpDescription,
    quickHelpCta,
    children,
}: PageHeroProps) {
    return (
        <section className="relative overflow-hidden bg-[linear-gradient(160deg,#030c1f_0%,#031a3f_45%,#041f4f_100%)] text-white">
            <div className="pointer-events-none absolute inset-0 opacity-90">
                {heroDecorations.map((className, index) => (
                    <div key={index} className={className} aria-hidden />
                ))}
                <svg
                    className="absolute inset-x-0 bottom-[-1px] text-[#041939]"
                    viewBox="0 0 1440 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden
                >
                    <path
                        d="M0 120L60 113.3C120 107 240 94 360 90.7C480 87 600 93 720 103.3C840 113 960 127 1080 127.3C1200 127 1320 113 1380 106.7L1440 100V160H1380C1320 160 1200 160 1080 160C960 160 840 160 720 160C600 160 480 160 360 160C240 160 120 160 60 160H0V120Z"
                        fill="currentColor"
                        fillOpacity="0.3"
                    />
                </svg>
            </div>

            <div className="container relative grid gap-12 pb-20 pt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pb-28 lg:pt-28">
                <div className="space-y-10">
                    <div className="space-y-5">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.48em] text-accent-100/80">
                            {eyebrow}
                        </span>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                                {title}
                            </h1>
                            <p className="max-w-2xl text-base text-brand-100/85 sm:text-lg">{description}</p>
                        </div>
                        {actions.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {actions.map(({ label, href, variant = 'primary', external }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noreferrer' : undefined}
                                        className={cn(
                                            'focus-ring inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition',
                                            variant === 'primary'
                                                ? 'bg-accent-300 text-brand-980 shadow-soft hover:-translate-y-0.5 hover:bg-accent-200'
                                                : 'border border-white/25 bg-white/10 text-white hover:border-white/35 hover:bg-white/15',
                                        )}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {badge && (
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-accent-100/80">
                            {badge}
                        </div>
                    )}

                    {stats.length > 0 && (
                        <dl className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-soft backdrop-blur">
                                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-brand-100/70">
                                        {stat.label}
                                    </dt>
                                    <dd className="mt-3 text-3xl font-semibold text-white">{stat.value}</dd>
                                    {stat.description && <p className="mt-2 text-sm text-brand-100/70">{stat.description}</p>}
                                </div>
                            ))}
                        </dl>
                    )}

                    {children}
                </div>

                <aside className="space-y-6 rounded-[2.5rem] border border-white/18 bg-white/8 p-8 shadow-soft backdrop-blur">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">{quickHelpHeading}</p>
                        {quickHelpDescription && <p className="text-sm text-brand-100/75">{quickHelpDescription}</p>}
                    </div>
                    <ul className="space-y-4">
                        {quickHelpItems.map((item) => (
                            <li key={`${item.href}-${item.title}`}>
                                <Link
                                    href={item.href}
                                    className="focus-ring group block rounded-[1.8rem] border border-white/15 bg-white/6 px-5 py-5 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12"
                                >
                                    <p className="text-sm font-semibold text-white line-2">{item.title}</p>
                                    <p className="mt-2 text-sm text-brand-100/75 line-3">{item.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-100">
                                        Lanjutkan
                                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {quickHelpCta && (
                        <Link
                            href={quickHelpCta.href}
                            className="focus-ring block rounded-[1.8rem] border border-accent-300/40 bg-accent-300/15 px-5 py-5 text-sm font-semibold text-accent-100 transition hover:border-accent-200 hover:bg-accent-200/20"
                        >
                            <span className="block text-white">{quickHelpCta.label}</span>
                            {quickHelpCta.description && <span className="mt-2 block text-xs text-brand-100/70">{quickHelpCta.description}</span>}
                        </Link>
                    )}
                </aside>
            </div>
        </section>
    );
}
