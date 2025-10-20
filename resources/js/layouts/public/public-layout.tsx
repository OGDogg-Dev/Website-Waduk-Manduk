import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
interface PublicLayoutProps {
    hero?: React.ReactNode;
    children: React.ReactNode;
}
type NavItem = {
    label: string;
    href: string;
    match: string;
};
export function PublicLayout({ hero, children }: PublicLayoutProps) {
    const page = usePage<SharedData>();
    const currentUrl = page.url;
    const navItems: NavItem[] = useMemo(
        () => [
            { label: 'Beranda', href: route('home'), match: '/' },
            {
                label: 'Rencanakan Kunjungan',
                href: route('visit.plan'),
                match: '/rencanakan-kunjungan',
            },
            {
                label: 'Jelajah & Aktivitas',
                href: route('explore.index'),
                match: '/jelajah-aktivitas',
            },
            {
                label: 'UMKM & Kuliner',
                href: route('umkm.directory'),
                match: '/umkm',
            },
            {
                label: 'Konservasi & Edukasi',
                href: route('conservation.index'),
                match: '/konservasi-edukasi',
            },
            {
                label: 'Komunitas',
                href: route('community.index'),
                match: '/komunitas',
            },
            {
                label: 'Berita & Cerita',
                href: route('stories.index'),
                match: '/cerita',
            },
            {
                label: 'Tentang & Kontak',
                href: route('about.index'),
                match: '/tentang',
            },
        ],
        [],
    );
    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground">
            <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
                    <Link
                        href={route('home')}
                        className="text-lg font-semibold tracking-tight text-primary"
                    >
                        Waduk Manduk
                    </Link>
                    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                        {navItems.map((item) => {
                            const isActive =
                                currentUrl === item.match ||
                                currentUrl.startsWith(`${item.match}/`);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'transition hover:text-primary',
                                        isActive
                                            ? 'text-primary'
                                            : 'text-muted-foreground',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            size="sm"
                            asChild
                            className="hidden md:inline-flex"
                        >
                            <Link href={route('login')}>Masuk Admin</Link>
                        </Button>
                    </div>
                </div>
            </header>
            {hero && <div className="bg-muted/40">{hero}</div>}
            <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
                    {children}
                </div>
            </main>
            <footer className="border-t border-border bg-muted/20">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
                    <p>
                        © {new Date().getFullYear()} Ekowisata Waduk Manduk.
                        Mengalir bersama komunitas.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://maps.google.com"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:text-primary"
                        >
                            Google Maps
                        </a>
                        <Link href={route('support.index')} className="hover:text-primary">
                            Dukungan
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
