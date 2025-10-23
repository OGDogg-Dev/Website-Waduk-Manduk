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
        <header className="sticky top-0 z-50 text-on-dark shadow-soft">
            <div className="relative border-b border-white/10 bg-brand-950/90 backdrop-blur">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300"
                    aria-hidden
                />
                <div className="container flex items-center justify-between gap-4 py-4 lg:py-5">
                    <Link
                        href={route('home')}
                        className="focus-ring group flex items-center gap-3"
                        aria-label="Beranda Waduk Manduk"
                    >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-500 text-base font-semibold text-brand-950 shadow-soft transition group-hover:-translate-y-0.5">
                            WM
                        </span>
                        <div className="hidden sm:block leading-tight">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-accent-300/80">
                                Waduk Manduk
                            </p>
                            <p className="text-sm font-semibold text-on-dark">SIPARI Bahari</p>
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
                                    'focus-ring relative px-1 py-2 transition-colors focus-visible:text-accent-300',
                                    isActive(item.match)
                                        ? 'text-accent-200'
                                        : 'text-on-dark/75 hover:text-on-dark',
                                )}
                                aria-current={isActive(item.match) ? 'page' : undefined}
                            >
                                <span>{item.label}</span>
                                <span
                                    className={cn(
                                        'absolute left-0 right-0 -bottom-1 h-0.5 origin-left rounded-full bg-accent-300 transition-transform',
                                        isActive(item.match) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                                    )}
                                    aria-hidden
                                />
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            size="sm"
                            className="focus-ring hidden rounded-full bg-accent-300 px-5 text-brand-950 hover:bg-accent-200 lg:inline-flex"
                        >
                            <Link href={route('visit.plan')}>Reservasi</Link>
                        </Button>
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 text-on-dark hover:bg-white/10 lg:hidden"
                                    aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                                    aria-expanded={open}
                                    aria-controls="menu-mobile"
                                >
                                    <Menu className="h-5 w-5" aria-hidden />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="flex flex-col gap-6 bg-[linear-gradient(150deg,#04132d,#031a3a)] text-on-dark"
                                aria-labelledby="navigasi-mobile-title"
                            >
                                <SheetHeader>
                                    <SheetTitle id="navigasi-mobile-title" className="text-lg font-semibold text-on-dark">
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
                                                    ? 'bg-white/15 text-accent-200'
                                                    : 'hover:bg-white/10',
                                            )}
                                            aria-current={isActive(item.match) ? 'page' : undefined}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                <Link
                                    href={route('login')}
                                    className="focus-ring rounded-full border border-white/20 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-on-dark transition hover:bg-white/10"
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
