import { Link } from '@inertiajs/react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    if (!items.length) {
        return null;
    }

    return (
        <nav aria-label="Breadcrumb" className={className}>
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                <li>
                    <Link href={route('home')} className="focus-ring rounded-full bg-brand-100/20 px-3 py-1 text-brand-100">
                        Beranda
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                        <span aria-hidden className="text-brand-600/60">/</span>
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="focus-ring rounded-full bg-brand-100/10 px-3 py-1 text-brand-100 transition hover:bg-brand-100/20"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="rounded-full bg-brand-100/20 px-3 py-1 text-brand-50">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
