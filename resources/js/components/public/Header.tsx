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
        { label: 'Beranda', href: route('home'), match: '/' },
        { label: 'QRIS', href: route('qris.index'), match: '/pembayaran-qris' },
        { label: 'Fasilitas & Harga', href: route('visit.plan'), match: '/rencanakan-kunjungan' },
        { label: 'Peta', href: route('explore.index'), match: '/jelajah-aktivitas' },
        { label: 'Galeri', href: route('community.index'), match: '/komunitas' },
        { label: 'Berita', href: route('stories.index'), match: '/cerita' },
        { label: 'Kontak', href: route('about.index'), match: '/tentang' },
    ];

    const isActive = (match: string) => url === match || url.startsWith(`${match}/`);

    return (
        <header className="sticky top-0 z-50 bg-brand-900/95 text-on-dark shadow-soft backdrop-blur">
            <div className="container flex items-center justify-between py-4">
                <Link href={route('home')} className="focus-ring flex items-center gap-3" aria-label="Beranda Waduk Manduk">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-500 text-base font-semibold text-brand-900 shadow-soft">
                        WM
                    </span>
                    <div className="hidden sm:block">
                        <p className="eyebrow text-xs tracking-[0.4em] text-on-media-muted">Waduk Manduk</p>
                        <p className="text-sm font-semibold text-on-dark">Ekowisata Bahari</p>
                    </div>
                </Link>
                <nav className="hidden items-center gap-6 text-sm font-semibold uppercase tracking-[0.24em] lg:flex" aria-label="Navigasi utama">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'group focus-ring relative px-1 py-2 transition-colors',
                                isActive(item.match)
                                    ? 'text-accent-300'
                                    : 'text-on-dark/80 hover:text-on-dark',
                            )}
                            aria-current={isActive(item.match) ? 'page' : undefined}
                        >
                            <span>{item.label}</span>
                            <span
                                className={cn(
                                    'absolute left-0 right-0 -bottom-1 h-0.5 origin-left rounded-full bg-accent-400 transition-transform',
                                    isActive(item.match) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                                )}
                                aria-hidden
                            />
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <Button asChild size="sm" className="focus-ring hidden rounded-full bg-accent-400 px-4 text-brand-950 hover:bg-accent-300 lg:inline-flex">
                        <Link href={route('visit.plan')}>Reservasi</Link>
                    </Button>
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-on-dark hover:bg-white/10 lg:hidden"
                                aria-label="Buka menu navigasi"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="flex flex-col gap-6 bg-brand-900/95 text-on-dark">
                            <SheetHeader>
                                <SheetTitle className="text-lg font-semibold text-on-dark">Navigasi Waduk Manduk</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-2" aria-label="Navigasi utama mobile">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'focus-ring rounded-xl px-3 py-3 text-base font-semibold transition-colors',
                                            isActive(item.match)
                                                ? 'bg-accent-500/15 text-accent-300'
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
                                className="focus-ring rounded-full border border-white/20 px-4 py-3 text-center font-semibold hover:bg-white/10"
                            >
                                Masuk Admin
                            </Link>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
