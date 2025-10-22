import { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    CalendarDays,
    Menu,
    MessageCircle,
    Phone,
} from 'lucide-react';

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
    const [isScrolled, setIsScrolled] = useState(false);

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
                label: 'Informasi QRIS',
                href: route('qris.index'),
                match: '/pembayaran-qris',
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 24);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const resolvedVariant = variant === 'transparent' && !isScrolled ? 'transparent' : 'solid';
    const isTransparent = resolvedVariant === 'transparent';

    return (
        <header
            className={cn(
                'sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur supports-[backdrop-filter]:bg-opacity-95',
                isTransparent
                    ? 'bg-transparent'
                    : 'border-b border-brand-900/10 bg-surface-0/95 shadow-soft',
            )}
        >
            <div
                className={cn(
                    'mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 transition-colors sm:px-10',
                    isTransparent ? 'text-on-media' : 'text-text-primary',
                )}
            >
                <Link href={route('home')} className="flex items-center gap-3 focus-ring">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-wave-gold text-base font-semibold text-deep-navy shadow-reef">
                        WM
                    </span>
                    <div className="flex flex-col">
                        <span
                            className={cn(
                                'text-xs font-semibold uppercase tracking-[0.4em]',
                                isTransparent ? 'text-on-media-muted' : 'text-text-secondary',
                            )}
                        >
                            Waduk Manduk
                        </span>
                        <span
                            className={cn(
                                'text-lg font-semibold tracking-tight',
                                isTransparent ? 'text-on-media' : 'text-text-primary',
                            )}
                        >
                            Destinasi Ekowisata Bahari
                        </span>
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Navigasi utama">
                    {navItems.map((item) => {
                        const isActive =
                            currentUrl === item.match || currentUrl.startsWith(`${item.match}/`);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'rounded-md px-1.5 py-1 text-sm font-medium transition-colors focus-ring',
                                    isTransparent
                                        ? 'text-on-media-muted hover:text-accent-300'
                                        : 'text-text-secondary hover:text-brand-600',
                                    isActive &&
                                        (isTransparent
                                            ? 'text-accent-300'
                                            : 'text-brand-700'),
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        className="hidden rounded-full bg-gold-accent text-deep-navy shadow-reef hover:bg-gold-accent/90 focus-visible-outline lg:inline-flex"
                        asChild
                    >
                        <Link href={route('visit.plan')}>Reservasi</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden rounded-full border border-white/25 text-on-media hover:bg-white/10 focus-visible-outline lg:inline-flex"
                        asChild
                    >
                        <Link href={route('login')}>Masuk Admin</Link>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-on-media hover:bg-white/10 focus-visible-outline lg:hidden"
                                aria-label="Buka navigasi"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[88vw] max-w-sm border-none bg-gradient-to-b from-[rgba(2,18,36,0.98)] via-[#0c2f53] to-[#05192f] text-white shadow-reef"
                        >
                            <div className="flex flex-1 flex-col gap-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-accent/90 text-lg font-semibold text-deep-navy shadow-reef">
                                        WM
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-light">
                                            Waduk Manduk
                                        </p>
                                        <p className="text-base font-semibold text-on-media">Destinasi Ekowisata Bahari</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-sky-light">
                                        Navigasi
                                    </p>
                                    <div className="grid gap-2 text-sm">
                                        {navItems.map((item) => {
                                            const isActive =
                                                currentUrl === item.match ||
                                                currentUrl.startsWith(`${item.match}/`);

                                            return (
                                                <Link
                                                    key={`mobile-${item.href}`}
                                                    href={item.href}
                                                    className={cn(
                                                        'flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base font-medium transition hover:border-gold-accent/60 hover:bg-white/10 focus-visible-outline',
                                                        isActive && 'border-gold-accent/70 bg-white/15 text-gold-accent',
                                                    )}
                                                    aria-current={isActive ? 'page' : undefined}
                                                >
                                                    {item.label}
                                                    <ArrowRight className="h-4 w-4" aria-hidden />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-sky-light">
                                        Aksi cepat
                                    </p>
                                    <Button
                                        className="w-full justify-between rounded-full bg-gold-accent px-6 text-deep-navy shadow-reef hover:bg-gold-accent/90 focus-visible-outline"
                                        asChild
                                    >
                                        <Link href={route('visit.plan')}>
                                            <span className="flex items-center gap-2">
                                                <CalendarDays className="h-4 w-4" aria-hidden />
                                                Reservasi Kunjungan
                                            </span>
                                            <ArrowRight className="h-4 w-4" aria-hidden />
                                        </Link>
                                    </Button>
                                    <div className="grid gap-2 text-sm">
                                        <a
                                            href="https://wa.me/6281234567890"
                                            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/12 focus-visible-outline"
                                        >
                                            <MessageCircle className="h-4 w-4 text-gold-accent" aria-hidden />
                                            <div className="flex flex-col">
                                                <span className="font-medium">Chat WhatsApp</span>
                                                <span className="text-xs text-white/70">Tim reservasi komunitas</span>
                                            </div>
                                        </a>
                                        <a
                                            href="tel:+6281234567890"
                                            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/12 focus-visible-outline"
                                        >
                                            <Phone className="h-4 w-4 text-gold-accent" aria-hidden />
                                            <div className="flex flex-col">
                                                <span className="font-medium">Hubungi Loket</span>
                                                <span className="text-xs text-white/70">Setiap hari 08.00–17.00</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <Separator className="border-white/10" />

                                <div className="space-y-2 text-xs text-on-media-muted">
                                    <p className="font-semibold uppercase tracking-[0.35em] text-sky-light">
                                        Informasi penting
                                    </p>
                                    <p>
                                        Pembayaran non-tunai tersedia di lokasi. Website ini hanya menyediakan informasi QRIS.
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
