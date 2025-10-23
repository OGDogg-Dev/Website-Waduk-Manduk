import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

type NavItem = {
    label: string;
    href: string;
    match: string;
};

export function Header() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const navItems: NavItem[] = [
        { label: 'Tentang', href: route('about.index'), match: '/tentang' },
        { label: 'Berita', href: route('stories.index'), match: '/cerita' },
        { label: 'Komunitas', href: route('community.index'), match: '/komunitas' },
        { label: 'Panduan', href: route('support.index'), match: '/dukungan' },
        { label: 'Konservasi', href: route('conservation.index'), match: '/konservasi-edukasi' },
        { label: 'UMKM', href: route('umkm.directory'), match: '/umkm' },
        { label: 'Jelajah', href: route('explore.index'), match: '/jelajah-aktivitas' },
        { label: 'Rencanakan', href: route('visit.plan'), match: '/rencanakan-kunjungan' },
        { label: 'QRIS', href: route('qris.index'), match: '/pembayaran-qris' },
    ];

    const isActive = (match: string) => url === match || url.startsWith(`${match}/`);

    return (
        <header className="relative text-white">
            <div className="relative border-b border-white/12 bg-navy-900/95 backdrop-blur">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-600 via-gold-500 to-sky-400"
                    aria-hidden
                />
                <div className="container flex items-center justify-between gap-4 py-4 lg:py-5">
                    <Link
                        href={route('home')}
                        className="focus-ring group flex items-center gap-3"
                        aria-label="Beranda Waduk Manduk"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-base font-semibold text-navy-900 shadow-soft transition group-hover:-translate-y-0.5">
                            WM
                        </span>
                        <div className="hidden sm:block leading-tight">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-accent-300/80">
                                Waduk Manduk
                            </p>
                            <p className="text-sm font-semibold text-white">SIPARI Bahari</p>
                        </div>
                    </Link>
                    <nav
                        className="hidden items-center gap-6 text-[0.72rem] font-semibold uppercase tracking-[0.32em] lg:flex"
                        aria-label="Navigasi utama"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'focus-ring group relative px-1 py-2 transition-colors focus-visible:text-gold-400',
                                    isActive(item.match)
                                        ? 'text-gold-300'
                                        : 'text-white/80 hover:text-white',
                                )}
                                aria-current={isActive(item.match) ? 'page' : undefined}
                            >
                                <span>{item.label}</span>
                                <span
                                    className={cn(
                                        'pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 origin-left rounded-full bg-gold-400 transition-transform',
                                        isActive(item.match) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                                    )}
                                    aria-hidden
                                />
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-3 lg:flex">
                            <Link
                                href={route('visit.plan')}
                                className="focus-ring btn-primary text-xs uppercase tracking-[0.24em] text-navy-900"
                            >
                                Registrasi Online
                            </Link>
                            <a
                                href="tel:112"
                                className="focus-ring btn-ghost text-xs uppercase tracking-[0.24em] text-white hover:border-white/70 hover:text-white"
                            >
                                Emergency Call
                            </a>
                        </div>
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 text-white hover:bg-white/10 lg:hidden"
                                    aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                                    aria-expanded={open ? 'true' : 'false'}
                                    aria-controls="menu-mobile"
                                >
                                    <Menu className="h-5 w-5" aria-hidden />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="flex flex-col gap-6 bg-[linear-gradient(150deg,#061a2c,#0b2741)] text-white"
                                aria-labelledby="navigasi-mobile-title"
                            >
                                <SheetHeader>
                                    <SheetTitle id="navigasi-mobile-title" className="text-lg font-semibold text-white">
                                        Navigasi Waduk Manduk
                                    </SheetTitle>
                                </SheetHeader>
                                <nav id="menu-mobile" className="flex flex-col gap-2" aria-label="Navigasi utama mobile">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                'focus-ring rounded-xl px-3 py-3 text-base font-semibold transition-colors',
                                                isActive(item.match)
                                                    ? 'bg-white/15 text-gold-300'
                                                    : 'text-white/90 hover:bg-white/10 hover:text-white',
                                            )}
                                            aria-current={isActive(item.match) ? 'page' : undefined}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-4 flex flex-col gap-3">
                                    <Link
                                        href={route('visit.plan')}
                                        className="focus-ring btn-primary text-center text-xs uppercase tracking-[0.24em] text-navy-900"
                                        onClick={() => setOpen(false)}
                                    >
                                        Registrasi Online
                                    </Link>
                                    <a
                                        href="tel:112"
                                        className="focus-ring btn-ghost text-center text-xs uppercase tracking-[0.24em] text-white hover:border-white/70 hover:text-white"
                                    >
                                        Emergency Call
                                    </a>
                                </div>
                                <Link
                                    href={route('login')}
                                    className="focus-ring rounded-full border border-white/20 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
                                >
                                    Masuk Admin
                                </Link>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
