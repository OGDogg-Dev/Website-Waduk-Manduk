import { Link } from '@inertiajs/react';
import { Play } from 'lucide-react';
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
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    alt: 'Panorama Waduk Manduk dengan perahu wisata dan bukit hijau',
};

const heroStats = [
    { label: 'Spot wisata', value: '18+' },
    { label: 'UMKM mitra', value: '37' },
    { label: 'Agenda tahunan', value: '24' },
    { label: 'Pengunjung', value: '120K' },
];

export function HomeHero({ status, quickHelpItems }: HomeHeroProps) {
    return (
        <section
            className="relative isolate overflow-hidden text-on-dark"
            aria-labelledby="beranda-hero-heading"
        >
            <div
                className="absolute inset-0 -z-20"
                aria-hidden
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,76,129,0.55)_0%,rgba(0,27,59,0.92)_58%,#001326_100%)]" />
                <img
                    src={heroImage.src}
                    alt=""
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-x-[-20%] bottom-[-18rem] h-[32rem] rounded-full bg-gold-500/15 blur-[180px]" />
                <div className="absolute inset-x-[-25%] top-[-16rem] h-[28rem] rounded-full bg-brand-500/25 blur-[200px]" />
            </div>

            <div className="container relative grid gap-12 pb-28 pt-32 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pb-36">
                <div className="space-y-8">
                    <div className="space-y-5">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-sky-200">
                            Destinasi Bahari Jatim
                        </span>
                        <h1
                            id="beranda-hero-heading"
                            className="text-4xl font-semibold leading-tight text-white sm:text-[2.9rem] lg:text-[3.8rem] lg:leading-[1.05]"
                        >
                            Destinasi Ekowisata Bahari Waduk Manduk
                        </h1>
                        <p className="max-w-[60ch] text-base text-white/75 sm:text-lg">
                            Jelajahi wisata air, susur mangrove, serta kuliner UMKM pesisir dengan panduan terpadu yang ramah keluarga dan berkelanjutan.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={route('explore.index')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-950 shadow-[0_18px_45px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5"
                        >
                            Jelajahi sekarang
                        </Link>
                        <Link
                            href={route('support.index')}
                            className="focus-ring inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white/40 hover:bg-white/15"
                        >
                            <Play className="h-4 w-4" aria-hidden />
                            Tonton video
                        </Link>
                    </div>

                    <div className="grid gap-3 rounded-[2.75rem] border border-white/15 bg-white/10 p-6 shadow-[0_25px_80px_rgba(0,19,38,0.35)] backdrop-blur">
                        <div className="grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
                            {heroStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-2xl border border-white/15 bg-white/10 p-4"
                                >
                                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-[2.5rem] border border-white/15 bg-brand-950/40 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
                                Status kunjungan terkini
                            </p>
                            <div className="mt-4">
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
                                    <p className="rounded-3xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-sm text-white/70">
                                        Status kunjungan akan diperbarui oleh tim lapangan dan tampil otomatis di sini.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative mx-auto max-w-lg overflow-hidden rounded-[3.25rem] border border-white/18 bg-white/8 p-6 backdrop-blur-xl">
                        <div className="absolute -top-12 right-6 hidden h-32 w-32 rounded-full bg-gold-500/25 blur-[70px] lg:block" aria-hidden />
                        <div className="absolute -bottom-16 left-4 h-36 w-36 rounded-full bg-sky-200/35 blur-[80px]" aria-hidden />
                        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
                            <img
                                src={heroImage.src}
                                alt={heroImage.alt}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div className="mt-6 space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
                                Layanan cepat
                            </p>
                            <ul className="grid gap-3" aria-label="Tautan bantuan cepat">
                                {quickHelpItems.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="focus-ring group block rounded-3xl border border-white/18 bg-white/12 p-4 text-left transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/16"
                                        >
                                            <p className="text-sm font-semibold text-white line-2">{item.title}</p>
                                            <p className="mt-1 text-sm text-white/75 line-3">{item.description}</p>
                                            <span className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">
                                                Selengkapnya
                                                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="pointer-events-none absolute inset-x-[-15%] bottom-[-4.5rem] -z-10">
                        <WaveDivider variant="transparent" />
                    </div>
                </div>
            </div>

            <WaveDivider variant="brand" />
        </section>
    );
}
