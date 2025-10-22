import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarDays, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from '@inertiajs/react';

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
    return (
        <>
            <div
                className={cn(
                    'pointer-events-none fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-md flex-col gap-3 px-4 pb-4 md:hidden',
                    className,
                )}
                aria-hidden={false}
            >
                <div className="pointer-events-auto rounded-3xl border border-white/10 bg-deep-navy/95 p-4 text-white shadow-reef">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-light">
                                Butuh bantuan?
                            </p>
                            <p className="mt-2 text-sm text-white/80">
                                Tim komunitas siap membantu rencana kunjunganmu setiap hari.
                            </p>
                        </div>
                        <a
                            href="https://wa.me/6281234567890"
                            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-accent text-deep-navy shadow-reef"
                            aria-label="Kirim pesan WhatsApp"
                        >
                            <MessageCircle className="h-5 w-5" aria-hidden />
                        </a>
                    </div>
                    <div className="mt-4 grid gap-2">
                        {quickActions.map((action) => {
                            const Icon = action.icon;

                            if (action.isExternal) {
                                return (
                                    <a
                                        key={action.label}
                                        href={action.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-gold-accent/60 hover:bg-white/10"
                                    >
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col text-left">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-white/70">{action.description}</span>
                                        </div>
                                    </a>
                                );
                            }

                            return (
                                <Button
                                    key={action.label}
                                    className="justify-start gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm text-white hover:border-gold-accent/60 hover:bg-white/20"
                                    asChild
                                >
                                    <Link href={action.href}>
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-white/80">{action.description}</span>
                                        </div>
                                    </Link>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    'pointer-events-none fixed bottom-6 right-6 z-40 hidden w-[320px] flex-col gap-3 md:flex',
                    className,
                )}
            >
                <div className="pointer-events-auto rounded-3xl border border-white/10 bg-gradient-to-br from-deep-navy via-[#0c2f53] to-[#05192f] p-5 text-white shadow-[0_18px_45px_-25px_rgba(8,34,60,0.55)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-light">Bantuan cepat</p>
                    <p className="mt-2 text-sm text-white/75">
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
                                        className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 transition hover:border-gold-accent/60 hover:bg-white/15"
                                    >
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col text-left">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-white/70">{action.description}</span>
                                        </div>
                                    </a>
                                );
                            }

                            return (
                                <Button
                                    key={`desktop-${action.label}`}
                                    variant="ghost"
                                    className="justify-start gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-left text-sm text-white hover:border-gold-accent/60 hover:bg-white/15"
                                    asChild
                                >
                                    <Link href={action.href}>
                                        <Icon className="h-4 w-4 text-gold-accent" aria-hidden />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{action.label}</span>
                                            <span className="text-[11px] text-white/75">{action.description}</span>
                                        </div>
                                    </Link>
                                </Button>
                            );
                        })}
                        <a
                            href="tel:+6281234567890"
                            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-gold-accent/60 hover:bg-white/10"
                        >
                            <Phone className="h-4 w-4 text-gold-accent" aria-hidden />
                            <div className="flex flex-col">
                                <span className="font-medium">Hubungi loket</span>
                                <span className="text-[11px] text-white/70">0812-3456-7890 • 08.00–17.00</span>
                            </div>
                        </a>
                        <a
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 rounded-2xl border border-gold-accent/50 bg-gold-accent/10 px-4 py-3 text-sm text-white transition hover:border-gold-accent hover:bg-gold-accent/15"
                        >
                            <MessageCircle className="h-4 w-4 text-gold-accent" aria-hidden />
                            <div className="flex flex-col">
                                <span className="font-medium">Chat dengan kami</span>
                                <span className="text-[11px] text-white/75">Respon rata-rata &lt; 5 menit</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
