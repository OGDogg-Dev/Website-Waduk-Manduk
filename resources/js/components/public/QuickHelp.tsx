import { cn } from '@/lib/utils';

interface QuickHelpItem {
    href: string;
    title: string;
    description: string;
}

interface QuickHelpProps {
    heading?: string;
    description?: string;
    items: QuickHelpItem[];
    className?: string;
}

export function QuickHelp({ heading = 'Bantuan cepat', description, items, className }: QuickHelpProps) {
    if (!items.length) {
        return null;
    }

    return (
        <aside
            className={cn(
                'rounded-3xl bg-brand-900/92 p-6 text-on-media shadow-soft backdrop-blur-lg lg:sticky lg:top-24',
                className,
            )}
        >
            <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-on-media/80">{heading}</p>
                {description && <p className="text-sm text-on-media-muted">{description}</p>}
            </div>
            <ul className="mt-6 space-y-4">
                {items.map((item) => (
                    <li key={item.href}>
                        <a
                            href={item.href}
                            className="focus-ring group block rounded-2xl border border-white/12 bg-white/5 p-4 transition hover:border-white/30 hover:bg-white/10"
                        >
                            <h3 className="text-sm font-semibold text-on-media line-2">{item.title}</h3>
                            <p className="mt-2 text-sm text-on-media-muted line-3">{item.description}</p>
                            <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-on-media/80">
                                Pelajari lebih lanjut
                                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
