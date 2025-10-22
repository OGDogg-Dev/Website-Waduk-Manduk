import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, ChevronDown, ChevronUp, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface FloatingVisitorToolbarProps {
    className?: string;
}

const quickActions = [
    {
        icon: CalendarDays,
        label: 'Reservasi kunjungan',
        description: 'Pilih paket tur dan jadwal yang tersedia',
        href: route('visit.plan'),
        isExternal: false,
    },
    {
        icon: MapPin,
        label: 'Petunjuk arah',
        description: 'Buka rute Google Maps menuju Waduk Manduk',
        href: 'https://maps.google.com/?q=Waduk+Manduk+Jatirejo',
        isExternal: true,
    },
];

export function FloatingVisitorToolbar({ className }: FloatingVisitorToolbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <div
                className={cn(
                    'pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md flex-col gap-3 px-4 md:hidden',
                    className,
                )}
                aria-hidden={false}
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)' }}
            >
                <div className="pointer-events-auto overflow-hidden rounded-3xl border border-white/12 bg-[color:var(--overlay/700)] text-white shadow-reef">
                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible-outline"
                        aria-expanded={mobileOpen}
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-light">
                                Bantuan cepat
                            </span>
                            <span className="mt-1 text-sm text-on-media-muted">
                                Rencanakan perjalanan atau hubungi loket secara instan.
                            </span>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-accent/15 text-gold-accent">
                            {mobileOpen ? <ChevronUp className="h-4 w-4" aria-hidden /> : <ChevronDown className="h-4 w-4" aria-hidden />}
                        </span>
                    </button>
                    <div className={cn('grid gap-2 px-5 pb-5 transition-[max-height,opacity] duration-300', mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0')}
                        aria-hidden={!mobileOpen}
                    >
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            if (action.isExternal) {
                                return (
                                    <a
                                        key={action.label}
                                        href={action.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-sm transition hover:border-gold-accent/60 hover:bg-white/15 focus-visible-outline"
                                    >
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col text-left">
                                            <span className="font-medium text-on-media">{action.label}</span>
                                            <span className="text-[11px] text-on-media-muted">{action.description}</span>
                                        </div>
                                    </a>
                                );
                            }

                            return (
                                <Button
                                    key={action.label}
                                    className="justify-start gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 text-left text-sm text-on-media hover:border-gold-accent/60 hover:bg-white/18 focus-visible-outline"
                                    asChild
                                >
                                    <Link href={action.href}>
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-on-media-muted">{action.description}</span>
                                        </div>
                                    </Link>
                                </Button>
                            );
                        })}
                        <a
                            href="tel:+6281234567890"
                            className="flex items-center gap-3 rounded-2xl border border-gold-accent/40 bg-gold-accent/15 px-4 py-3 text-sm text-on-media transition hover:border-gold-accent hover:bg-gold-accent/20 focus-visible-outline"
                        >
                            <Phone className="h-4 w-4 text-gold-accent" aria-hidden />
                            <div className="flex flex-col">
                                <span className="font-medium">Hubungi loket</span>
                                <span className="text-[11px] text-on-media-muted">0812-3456-7890 • 08.00–17.00</span>
                            </div>
                        </a>
                        <a
                            href="https://wa.me/6281234567890"
                            className="flex items-center gap-3 rounded-2xl border border-gold-accent bg-gold-accent px-4 py-3 text-sm text-deep-navy transition hover:bg-gold-accent/90 focus-visible-outline"
                            aria-label="Kirim pesan WhatsApp"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden />
                            <span className="font-semibold">Chat WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'pointer-events-none fixed bottom-6 right-6 z-40 hidden w-[320px] flex-col gap-3 md:flex',
                    className,
                )}
            >
                <div className="pointer-events-auto rounded-3xl border border-white/15 bg-gradient-to-br from-[rgba(2,18,36,0.95)] via-[#0c2f53] to-[#05192f] p-5 text-white shadow-[0_18px_45px_-25px_rgba(8,34,60,0.55)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-light">Bantuan cepat</p>
                    <p className="mt-2 text-sm text-on-media-muted">
                        Rencanakan perjalanan, dapatkan petunjuk arah, atau hubungi loket kami.
                    </p>
                    <div className="mt-4 grid gap-2 text-sm">
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            if (action.isExternal) {
                                return (
                                    <a
                                        key={`desktop-${action.label}`}
                                        href={action.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/18 focus-visible-outline"
                                    >
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col text-left">
                                            <span className="font-medium text-on-media">{action.label}</span>
                                            <span className="text-[11px] text-on-media-muted">{action.description}</span>
                                        </div>
                                    </a>
                                );
                            }

                            return (
                                <Button
                                    key={`desktop-${action.label}`}
                                    variant="ghost"
                                    className="justify-start gap-3 rounded-2xl border border-white/20 bg-white/12 px-4 py-3 text-left text-sm text-on-media hover:border-gold-accent/60 hover:bg-white/18 focus-visible-outline"
                                    asChild
                                >
                                    <Link href={action.href}>
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-on-media-muted">{action.description}</span>
                                        </div>
                                    </Link>
                                </Button>
                            );
                        })}
                        <a
                            href="tel:+6281234567890"
                            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-on-media transition hover:border-gold-accent/60 hover:bg-white/15 focus-visible-outline"
                        >
                            <Phone className="h-4 w-4 text-gold-accent" aria-hidden />
                            <div className="flex flex-col">
                                <span className="font-medium">Hubungi loket</span>
                                <span className="text-[11px] text-on-media-muted">0812-3456-7890 • 08.00–17.00</span>
                            </div>
                        </a>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-gold-accent/50 bg-gold-accent/12 px-4 py-3 text-sm text-on-media transition hover:border-gold-accent hover:bg-gold-accent/20 focus-visible-outline"
                        >
                            <MessageCircle className="h-4 w-4 text-gold-accent" aria-hidden />
                            <div className="flex flex-col">
                                <span className="font-medium">Chat dengan kami</span>
                                <span className="text-[11px] text-on-media-muted">Respon rata-rata &lt; 5 menit</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
