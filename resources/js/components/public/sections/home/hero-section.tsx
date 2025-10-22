import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/public/layout/page-container';
import { WaveBackground } from '@/components/public/layout/wave-background';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import type { StatusResource } from '@/types/public';
import { Link } from '@inertiajs/react';
import { Compass, Leaf, Users, Waves } from 'lucide-react';

const stats = [
    { label: 'Spot snorkeling', value: '24+', icon: Waves },
    { label: 'UMKM Mitra', value: '38', icon: Leaf },
    { label: 'Event / tahun', value: '16', icon: Compass },
    { label: 'Pengunjung', value: '52K', icon: Users },
];

function StatsGrid() {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className="group flex flex-col gap-2 rounded-2xl border border-white/12 bg-white/12 p-4 text-on-media backdrop-blur transition hover:border-gold-accent/70"
                >
                    <item.icon className="h-6 w-6 text-gold-accent" />
                    <p className="text-2xl font-semibold">{item.value}</p>
                    <p className="text-sm uppercase tracking-[0.3em] text-on-media-muted">{item.label}</p>
                </div>
            ))}
        </div>
    );
}

function DeviceMockup() {
    return (
        <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-10 -top-10 hidden h-24 w-24 rounded-full border border-white/30 md:block" />
            <div className="absolute -right-6 bottom-6 hidden h-16 w-16 rounded-full border border-gold-accent/40 md:block" />
            <div className="relative rounded-[36px] bg-white/8 p-6 shadow-reef backdrop-blur">
                <div className="absolute -top-16 right-6 hidden h-32 w-32 rounded-full bg-gold-accent/40 blur-3xl md:block" />
                <div className="relative grid gap-4">
                    <div className="rounded-[28px] border border-white/15 bg-white/12 p-6 text-on-media">
                        <p className="text-sm uppercase tracking-[0.3em] text-on-media-muted">Live Underwater</p>
                        <h3 className="mt-2 text-2xl font-semibold">Monitor kualitas air real-time</h3>
                        <p className="mt-3 text-sm text-on-media-muted">
                            Pantau suhu, visibilitas, dan status konservasi langsung dari aplikasi waduk.
                        </p>
                    </div>
                    <div className="grid gap-3 rounded-[28px] border border-white/15 bg-white/12 p-6 text-on-media">
                        <div className="flex items-center justify-between text-sm">
                            <span className="uppercase tracking-[0.3em] text-on-media-muted">Explorer Pass</span>
                            <span className="rounded-full bg-gold-accent/35 px-3 py-1 text-xs text-on-media">Aktif</span>
                        </div>
                        <p className="text-3xl font-semibold">Rp125K</p>
                        <p className="text-sm text-on-media-muted">Paket tur interpretasi + sesi edukasi konservasi</p>
                        <div className="flex items-center gap-2 text-xs text-on-media-muted">
                            <span className="h-2 w-2 rounded-full bg-gold-accent" />
                            <span>Termasuk dokumentasi profesional</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface HomeHeroSectionProps {
    status?: StatusResource | null;
}

export function HomeHeroSection({ status }: HomeHeroSectionProps) {
    return (
        <section className="relative overflow-hidden bg-[#001629] pb-[clamp(5rem,12vw,7rem)] pt-28 text-white">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#001b3b]/95 via-[#001b3b]/78 to-[#0f4c81]/82" />
            </div>
            <PageContainer className="relative z-10 space-y-12">
                <WaveBackground className="hero-scrim border-none bg-transparent shadow-none">
                    <div className="relative z-10 grid gap-10 px-6 py-10 md:grid-cols-[1.1fr,0.9fr] md:items-center md:px-12 md:py-16">
                        <div className="space-y-6 text-balance">
                            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-sky-light">Ekowisata Bahari</p>
                            <h1 className="text-balance text-[clamp(2.5rem,6vw,3.25rem)] font-bold leading-tight text-on-media md:text-[52px]">
                                Destinasi Ekowisata Bahari Waduk Manduk
                            </h1>
                            <p className="max-w-xl text-base leading-relaxed text-on-media-muted md:text-lg">
                                Rasakan petualangan bawah air, jelajahi kekayaan biota, dan dukung komunitas pesisir melalui pengalaman wisata terkurasi.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button
                                    size="lg"
                                    className="rounded-full bg-gold-accent px-8 text-deep-navy shadow-reef hover:bg-gold-accent/90 focus-visible-outline"
                                    asChild
                                >
                                    <Link href={route('explore.index')}>Jelajahi Sekarang</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full border-white/65 bg-transparent px-8 text-on-media hover:bg-white/10 focus-visible-outline"
                                    asChild
                                >
                                    <Link href="https://www.youtube.com" target="_blank" rel="noreferrer">
                                        Tonton Video
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <DeviceMockup />
                    </div>
                </WaveBackground>
                <StatsGrid />
                {status && (
                    <div className="mt-8">
                        <StatusBanner
                            crowd_level={status.crowd_level}
                            weather_summary={status.weather_summary}
                            temperature={status.temperature}
                            advisory={status.advisory}
                            startLabel="Status lokasi terbaru"
                            tone="dark"
                        />
                    </div>
                )}
            </PageContainer>
        </section>
    );
}
