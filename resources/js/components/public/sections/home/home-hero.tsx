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

const collageImages = [
    {
        src: 'https://images.unsplash.com/photo-1544552866-0d96b05ad91e?auto=format&fit=crop&w=900&q=80',
        alt: 'Penyelam menelusuri terumbu karang di Waduk Manduk',
        className:
            'absolute right-6 top-0 w-[74%] -rotate-2 overflow-hidden rounded-[2.5rem] border border-white/40 shadow-hero backdrop-blur-sm',
    },
    {
        src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
        alt: 'Kawasan mangrove dan dermaga apung Waduk Manduk',
        className:
            'absolute left-6 bottom-0 w-[68%] rotate-3 overflow-hidden rounded-[2.5rem] border border-white/30 shadow-hero backdrop-blur-sm',
    },
];

export function HomeHero({ status, quickHelpItems }: HomeHeroProps) {
    return (
        <section className="relative isolate overflow-hidden bg-brand-950 text-on-media">
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(36,160,237,0.35)_0%,_rgba(7,24,54,0)_55%)]" aria-hidden />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-950 via-brand-950/90 to-brand-980" aria-hidden />
            <div className="absolute inset-x-[-25%] top-[-35%] h-[38rem] rounded-full bg-accent-400/15 blur-[180px]" aria-hidden />
            <div className="absolute inset-x-[-20%] bottom-[-22rem] h-[32rem] bg-[radial-gradient(circle,_rgba(11,44,96,0.55),_transparent_70%)]" aria-hidden />
            <svg
                className="absolute inset-x-0 bottom-[-1px] w-full text-brand-980"
                viewBox="0 0 1440 140"
                preserveAspectRatio="none"
                role="presentation"
            >
                <path
                    d="M0 70L80 62.7C160 55 320 40 480 36.7C640 33 800 41 960 50C1120 59 1280 69 1360 74.7L1440 80V140H1360C1280 140 1120 140 960 140C800 140 640 140 480 140C320 140 160 140 80 140H0Z"
                    fill="currentColor"
                />
            </svg>

            <div className="container relative grid gap-14 pb-24 pt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 lg:pb-36 lg:pt-28">
                <div className="space-y-9">
                    <div className="space-y-4">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-accent-200/90">
                            Ekspedisi Bahari Manduk
                        </span>
                        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
                            Destinasi kiriman alam dengan cerita konservasi terbaik
                        </h1>
                        <p className="max-w-2xl text-base text-on-media-muted sm:text-lg">
                            Rasakan petualangan bawah air Waduk Manduk, jelajahi konservasi terumbu dan mangrove, serta dukung UMKM pesisir yang menjaga ekosistem tetap lestari.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-400 px-7 py-3 text-sm font-semibold text-brand-950 shadow-soft transition hover:-translate-y-0.5 hover:bg-accent-300"
                        >
                            Rencanakan perjalanan
                        </Link>
                        <Link
                            href={route('community.index')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3 text-sm font-semibold text-on-media transition hover:border-white/40 hover:bg-white/10"
                        >
                            Lihat galeri bawah air
                        </Link>
                    </div>
                    <dl className="grid gap-5 sm:grid-cols-3">
                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur">
                            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-on-media-muted">
                                Koordinasi Lapangan
                            </dt>
                            <dd className="mt-3 text-2xl font-semibold text-white">18 Pemandu</dd>
                            <p className="mt-2 text-sm text-on-media-muted">
                                Tim konservasi siaga menjaga jalur wisata dan ekosistem setiap hari.
                            </p>
                        </div>
                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur">
                            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-on-media-muted">
                                Jalur Interpretasi
                            </dt>
                            <dd className="mt-3 text-2xl font-semibold text-white">12 Titik</dd>
                            <p className="mt-2 text-sm text-on-media-muted">
                                Snorkeling, susur mangrove, hingga laboratorium hidup pesisir.
                            </p>
                        </div>
                        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur">
                            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-on-media-muted">
                                UMKM Binaan
                            </dt>
                            <dd className="mt-3 text-2xl font-semibold text-white">37 Mitra</dd>
                            <p className="mt-2 text-sm text-on-media-muted">
                                Kuliner laut berkelanjutan dan kriya pesisir pilihan.
                            </p>
                        </div>
                    </dl>
                </div>

                <div className="space-y-6">
                    <div className="relative h-[20rem] rounded-[3rem] border border-white/20 bg-white/10">
                        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-white/5" aria-hidden />
                        <div className="absolute inset-6 rounded-[2.5rem] border border-white/15 bg-brand-950/30" aria-hidden />
                        <div className="absolute inset-0">
                            {collageImages.map((image) => (
                                <figure key={image.src} className={image.className}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                    <figcaption className="sr-only">{image.alt}</figcaption>
                                </figure>
                            ))}
                        </div>
                        <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-on-media">
                            Panorama & Stories
                        </div>
                    </div>

                    {status ? (
                        <div className="rounded-[2.5rem] border border-white/18 bg-white/12 p-6 shadow-soft backdrop-blur">
                            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-on-media-muted">
                                Status Waduk Manduk
                            </p>
                            <div className="mt-5">
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
                                Data lapangan dikirim langsung dari pusat kontrol setiap 30 menit.
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-[2.5rem] border border-dashed border-white/25 bg-white/5 p-6 text-sm text-on-media-muted backdrop-blur">
                            Status kunjungan akan tampil otomatis setelah tim lapangan melakukan pembaruan.
                        </div>
                    )}

                    <div className="grid gap-3">
                        {quickHelpItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="focus-ring group relative overflow-hidden rounded-[2.3rem] border border-white/18 bg-white/10 px-6 py-6 transition hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15"
                            >
                                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent-300 via-accent-400 to-brand-200" aria-hidden />
                                <div className="pl-4">
                                    <p className="text-sm font-semibold text-white line-2">{item.title}</p>
                                    <p className="mt-2 text-sm text-on-media-muted line-3">{item.description}</p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-200">
                                        Selengkapnya
                                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
