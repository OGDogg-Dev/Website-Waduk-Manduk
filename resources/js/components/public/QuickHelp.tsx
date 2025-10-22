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
                'relative overflow-hidden rounded-[28px] border border-white/10 bg-brand-950/90 p-6 text-on-media shadow-soft backdrop-blur-lg lg:sticky lg:top-24',
                className,
            )}
        >
            <span
                aria-hidden
                className="pointer-events-none absolute -right-12 top-[-4rem] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(66,198,193,0.4),transparent_70%)]"
            />
            <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 left-[-6rem] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(242,169,54,0.35),transparent_75%)]"
            />
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
