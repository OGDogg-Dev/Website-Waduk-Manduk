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

    return (
        <header
            className={cn(
                'sticky top-0 z-40 w-full transition-all duration-300',
                resolvedVariant === 'transparent'
                    ? 'bg-transparent'
                    : 'border-b border-white/10 bg-deep-navy/95/90 backdrop-blur supports-[backdrop-filter]:bg-deep-navy/80 shadow-[0_18px_40px_-28px_rgba(6,40,80,0.7)]',
            )}
        >
            <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between px-6 py-4 text-white sm:px-10">
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
                <nav className="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Navigasi utama">
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
                                aria-current={isActive ? 'page' : undefined}
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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white hover:bg-white/10 lg:hidden"
                                aria-label="Buka navigasi"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[88vw] max-w-sm border-none bg-gradient-to-b from-deep-navy via-[#0c2f53] to-[#05192f] text-white shadow-reef"
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
                                        <p className="text-base font-semibold">Destinasi Ekowisata Bahari</p>
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
                                                        'flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-base font-medium transition hover:border-gold-accent/60 hover:bg-white/10',
                                                        isActive && 'border-gold-accent/60 bg-white/15 text-gold-accent',
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
                                        className="w-full justify-between rounded-full bg-gold-accent px-6 text-deep-navy shadow-reef hover:bg-gold-accent/90"
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
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/10"
                                        >
                                            <MessageCircle className="h-4 w-4 text-gold-accent" aria-hidden />
                                            <div className="flex flex-col">
                                                <span className="font-medium">Chat WhatsApp</span>
                                                <span className="text-xs text-white/70">Tim reservasi komunitas</span>
                                            </div>
                                        </a>
                                        <a
                                            href="tel:+6281234567890"
                                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/10"
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

                                <div className="space-y-2 text-xs text-white/70">
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
