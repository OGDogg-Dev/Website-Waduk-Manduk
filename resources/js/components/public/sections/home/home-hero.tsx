import { Link } from '@inertiajs/react';
import { WaveDivider } from '@/components/public/WaveDivider';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import type { StatusResource } from '@/types/public';

interface HomeHeroProps {
    status: StatusResource | null;
    quickHelpItems: Array<{
        href: string;
        title: string;
        description: string;
    }>;
}

const heroImage = {
    src: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1400&q=80',
    alt: 'Panorama Waduk Manduk dengan perahu wisata dan hamparan bukit hijau',
};

const heroStats = [
    { label: 'Koordinasi lapangan', value: '18 Pemandu' },
    { label: 'Jalur interpretasi', value: '12 Titik' },
    { label: 'UMKM binaan', value: '37 Mitra' },
];

export function HomeHero({ status, quickHelpItems }: HomeHeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-brand-950 text-on-media" aria-labelledby="beranda-hero-heading">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(22,72,143,0.35)_0%,rgba(4,12,30,0.85)_55%,rgba(2,8,22,0.98)_100%)]" aria-hidden />
            <div className="absolute inset-x-[-10%] bottom-[-20%] h-[32rem] rounded-[48rem] bg-accent-400/15 blur-[160px]" aria-hidden />

            <div className="container relative grid gap-10 pb-20 pt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pb-32 lg:pt-28">
                <div className="relative">
                    <figure className="scrim-hero relative overflow-hidden rounded-[3rem] border border-white/15 shadow-soft">
                        <img
                            src={heroImage.src}
                            alt={heroImage.alt}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            className="h-full w-full object-cover"
                        />
                        <figcaption className="sr-only">{heroImage.alt}</figcaption>
                        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 p-6 text-left">
                            <span className="inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-accent-300">
                                Ekspedisi Bahari Manduk
                            </span>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {heroStats.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl border border-white/20 bg-white/12 p-4 text-left text-sm text-on-media"
                                    >
                                        <p className="text-2xl font-semibold text-on-media">{item.value}</p>
                                        <p className="text-xs uppercase tracking-[0.32em] text-on-media-muted">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </figure>
                </div>

                <div className="space-y-7">
                    <div className="space-y-4">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-accent-300">
                            Sistem Informasi Pariwisata (SIPARI)
                        </span>
                        <h1 id="beranda-hero-heading" className="text-4xl font-semibold leading-tight text-on-media sm:text-5xl lg:text-[3.6rem] lg:leading-[1.05]">
                            Portal resmi Waduk Manduk untuk kunjungan publik
                        </h1>
                        <p className="max-w-[60ch] text-base text-on-media-muted sm:text-lg">
                            Pantau status kunjungan, jadwalkan aktivitas bahari, dan dukung pelaku ekonomi pesisir melalui integrasi layanan SIPARI Manduk.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-300 px-7 py-3 text-sm font-semibold text-brand-950 shadow-soft transition hover:-translate-y-0.5 hover:bg-accent-200"
                        >
                            Rencanakan perjalanan
                        </Link>
                        <Link
                            href={route('support.index')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-on-media transition hover:border-white/35 hover:bg-white/15"
                        >
                            Baca panduan konservasi
                        </Link>
                    </div>

                    <div className="space-y-5 rounded-[2.75rem] border border-white/18 bg-white/10 p-6 shadow-soft backdrop-blur">
                        <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/90">
                                Sorotan SIPARI
                            </p>
                            <p className="text-sm text-on-media-muted">
                                Status kedatangan, kondisi cuaca, dan akses reservasi daring diperbarui langsung oleh pusat informasi.
                            </p>
                        </div>
                        {status ? (
                            <StatusBanner
                                tone="dark"
                                startLabel="Kepadatan pengunjung"
                                crowd_level={status.crowd_level}
                                weather_summary={status.weather_summary}
                                temperature={status.temperature}
                                advisory={status.advisory}
                                reported_at={status.reported_at}
                                valid_until={status.valid_until}
                            />
                        ) : (
                            <p className="rounded-3xl border border-dashed border-white/20 bg-white/10 px-4 py-6 text-sm text-on-media-muted">
                                Status kunjungan akan tampil otomatis setelah tim lapangan melakukan pembaruan.
                            </p>
                        )}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-300/90">Layanan cepat</p>
                            <ul className="mt-3 grid gap-3" aria-label="Tautan bantuan cepat">
                                {quickHelpItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="focus-ring group flex items-start gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-4 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
                                        >
                                            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent-300" aria-hidden />
                                            <div>
                                                <p className="text-sm font-semibold text-on-media line-2">{item.title}</p>
                                                <p className="mt-1 text-sm text-on-media-muted line-3">{item.description}</p>
                                                <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-accent-200">
                                                    Selengkapnya
                                                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <WaveDivider variant="brand" />
        </section>
    );
}
