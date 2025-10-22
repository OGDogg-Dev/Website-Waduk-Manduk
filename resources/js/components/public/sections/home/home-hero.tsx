import { Link } from '@inertiajs/react';
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

const heroImageBase = 'https://images.unsplash.com/photo-1526498460520-4c246339dccb';
const heroImageParams = '?auto=format&fit=crop';
const heroImageSrcSet = [
    `${heroImageBase}${heroImageParams}&w=640&q=80 640w`,
    `${heroImageBase}${heroImageParams}&w=960&q=80 960w`,
    `${heroImageBase}${heroImageParams}&w=1280&q=80 1280w`,
    `${heroImageBase}${heroImageParams}&w=1600&q=80 1600w`,
    `${heroImageBase}${heroImageParams}&w=2000&q=80 2000w`,
].join(', ');

export function HomeHero({ status, quickHelpItems }: HomeHeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-brand-950 text-on-media">
            <picture className="absolute inset-0 -z-20 h-full w-full">
                <source
                    srcSet={`${heroImageBase}${heroImageParams}&w=2400&q=80`}
                    media="(min-width: 1280px)"
                />
                <img
                    src={`${heroImageBase}${heroImageParams}&w=1600&q=80`}
                    srcSet={heroImageSrcSet}
                    sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
                    alt="Pemandangan bawah air Waduk Manduk dengan penyelam"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                />
            </picture>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950/20 via-brand-950/70 to-brand-950" aria-hidden />
            <div className="absolute inset-x-0 bottom-[-12rem] -z-10 h-[28rem]">
                <svg
                    className="h-full w-full"
                    viewBox="0 0 1440 560"
                    aria-hidden
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 480L60 458.7C120 437 240 395 360 357.3C480 320 600 286 720 293.3C840 301 960 349 1080 362.7C1200 377 1320 357 1380 346.7L1440 336V560H1380C1320 560 1200 560 1080 560C960 560 840 560 720 560C600 560 480 560 360 560C240 560 120 560 60 560H0Z"
                        fill="url(#hero-wave)"
                    />
                    <defs>
                        <linearGradient id="hero-wave" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(7, 24, 54, 0)" />
                            <stop offset="50%" stopColor="rgba(7, 24, 54, 0.35)" />
                            <stop offset="100%" stopColor="rgba(7, 24, 54, 1)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="relative">
                <div className="container grid gap-12 pb-20 pt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-32 lg:pt-32">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em]">
                                Ekowisata Bahari
                            </span>
                            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                                Selamat datang di pusat informasi bawah air Waduk Manduk
                            </h1>
                            <p className="max-w-2xl text-base text-on-media-muted sm:text-lg">
                                Ikuti ekspedisi konservasi, dukung UMKM pesisir, dan dapatkan pembaruan situasi lapangan secara real-time sebelum menjejakkan kaki di destinasi.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route('visit.plan')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 text-sm font-semibold text-brand-950 shadow-soft transition hover:bg-accent-300"
                            >
                                Rencanakan perjalanan
                            </Link>
                            <Link
                                href={route('community.index')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-on-media transition hover:border-white/40 hover:bg-white/10"
                            >
                                Lihat galeri bawah air
                            </Link>
                        </div>
                        <dl className="grid gap-6 sm:grid-cols-3">
                            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-on-media-muted">Koordinasi Lapangan</dt>
                                <dd className="mt-3 text-2xl font-semibold text-white">18 Pemandu</dd>
                                <p className="mt-2 text-sm text-on-media-muted">Tim konservasi aktif bertugas menjaga ekosistem pesisir setiap hari.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-on-media-muted">Jalur Interpretasi</dt>
                                <dd className="mt-3 text-2xl font-semibold text-white">12 Titik</dd>
                                <p className="mt-2 text-sm text-on-media-muted">Eksplorasi snorkeling dan jalur mangrove dengan narasi edukasi.</p>
                            </div>
                            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
                                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-on-media-muted">UMKM Binaan</dt>
                                <dd className="mt-3 text-2xl font-semibold text-white">37 Mitra</dd>
                                <p className="mt-2 text-sm text-on-media-muted">Kuliner laut berkelanjutan dan kriya pesisir tersertifikasi.</p>
                            </div>
                        </dl>
                    </div>
                    <div className="space-y-5">
                        {status && (
                            <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-soft backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-on-media-muted">Status Waduk Manduk</p>
                                <div className="mt-4">
                                    <StatusBanner
                                        tone="dark"
                                        startLabel="Kepadatan pengunjung"
                                        crowd_level={status.crowd_level}
                                        weather_summary={status.weather_summary}
                                        temperature={status.temperature}
                                        advisory={status.advisory}
                                    />
                                </div>
                                <p className="mt-4 text-sm text-on-media-muted">
                                    Data diperbarui langsung dari pusat kontrol lapangan setiap 30 menit.
                                </p>
                            </div>
                        )}
                        <div className="grid gap-3">
                            {quickHelpItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="focus-ring group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 px-5 py-6 transition hover:border-white/40 hover:bg-white/10"
                                >
                                    <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent-300 via-accent-400 to-accent-500" aria-hidden />
                                    <div className="pl-4">
                                        <p className="text-sm font-semibold text-white line-2">{item.title}</p>
                                        <p className="mt-2 text-sm text-on-media-muted line-3">{item.description}</p>
                                        <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-accent-200">
                                            Selengkapnya
                                            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
