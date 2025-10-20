import { useMemo } from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PublicHeaderProps {
    variant?: 'transparent' | 'solid';
}

type NavItem = {
    label: string;
    href: string;
    match: string;
};

export function PublicHeader({ variant = 'transparent' }: PublicHeaderProps) {
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
        <header
            className={cn(
                'sticky top-0 z-40 transition-colors duration-300',
                variant === 'transparent'
                    ? 'bg-transparent'
                    : 'border-b border-white/10 bg-deep-navy/95 backdrop-blur',
            )}
        >
            <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between px-6 py-5 text-white sm:px-10">
                <Link href={route('home')} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wave-gold text-base font-semibold text-deep-navy shadow-reef">
                        WM
                    </span>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold uppercase tracking-[0.4em] text-sky-light">
                            Waduk Manduk
                        </span>
                        <span className="text-lg font-semibold tracking-tight">Destinasi Ekowisata Bahari</span>
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
                    {navItems.map((item) => {
                        const isActive =
                            currentUrl === item.match || currentUrl.startsWith(`${item.match}/`);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'transition-colors hover:text-gold-accent',
                                    isActive ? 'text-gold-accent' : 'text-white/80',
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-2">
                    <Button size="sm" className="hidden rounded-full bg-gold-accent text-deep-navy shadow-reef hover:bg-gold-accent/90 lg:inline-flex" asChild>
                        <Link href={route('visit.plan')}>Reservasi</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden rounded-full border border-white/20 text-white hover:bg-white/10 lg:inline-flex"
                        asChild
                    >
                        <Link href={route('login')}>Masuk Admin</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
