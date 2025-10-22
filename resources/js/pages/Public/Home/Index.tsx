import { Head, Link } from '@inertiajs/react';
import { Hero } from '@/components/public/Hero';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PublicLayout } from '@/layouts/public/public-layout';
import type {
    EventResource,
    SpotResource,
    StatusResource,
    StoryResource,
    UmkmResource,
} from '@/types/public';

const heroImageBase = 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86';
const heroImageParams = '?auto=format&fit=crop';
const heroImageSrcSet = [
    `${heroImageBase}${heroImageParams}&w=640&q=80 640w`,
    `${heroImageBase}${heroImageParams}&w=960&q=80 960w`,
    `${heroImageBase}${heroImageParams}&w=1280&q=80 1280w`,
    `${heroImageBase}${heroImageParams}&w=1600&q=80 1600w`,
    `${heroImageBase}${heroImageParams}&w=2000&q=80 2000w`,
].join(', ');

interface HomePageProps {
    status: StatusResource | null;
    featuredSpots: SpotResource[];
    featuredUmkm: UmkmResource[];
    upcomingEvents: EventResource[];
    recentStories: StoryResource[];
}

export default function HomePage({
    status,
    featuredSpots = [],
    featuredUmkm = [],
    upcomingEvents = [],
    recentStories = [],
}: HomePageProps) {
    const heroQuickLinks = [
        {
            href: route('visit.plan'),
            icon: '🕘',
            title: 'Jam kunjungan harian',
            description: 'Kunjungi pukul 07.00–17.00 WIB dengan sesi snorkeling pagi & sore.',
        },
        {
            href: route('visit.plan'),
            icon: '🎫',
            title: 'Tiket & fasilitas',
            description: 'Lihat harga tiket, paket pelajar, serta penyewaan perlengkapan konservasi.',
        },
        {
            href: route('explore.index'),
            icon: '🗺️',
            title: 'Peta & akses',
            description: 'Gunakan peta interaktif untuk menemukan dermaga, jalur konservasi, dan UMKM mitra.',
        },
    ];

    const experienceHighlights = [
        {
            icon: '🌊',
            title: 'Tur snorkeling konservasi',
            description: 'Ikuti ranger bahari memantau kesehatan terumbu dan keanekaragaman hayati.',
        },
        {
            icon: '🚤',
            title: 'Pelayaran senja edukatif',
            description: 'Nikmati interpretasi ekologi sambil menjelajah laguna dan kanal mangrove.',
        },
        {
            icon: '🧭',
            title: 'Jalur jelajah terpandu',
            description: 'Temukan spot foto dan stasiun konservasi melalui rute yang sudah dikurasi.',
        },
    ];

    const heroHighlights = [
        { label: 'Konservasi aktif', value: '12', caption: 'program monitoring perairan' },
        { label: 'UMKM pesisir', value: '38', caption: 'mitra yang tersertifikasi' },
        { label: 'Kunjungan ramah lingkungan', value: '+25%', caption: 'peningkatan tiap tahun' },
    ];

    return (
        <PublicLayout
            hero={
                <Hero
                    image={`${heroImageBase}${heroImageParams}&w=1600&q=80`}
                    imageSrcSet={heroImageSrcSet}
                    imageSizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
                    alt="Panorama Waduk Manduk dilihat dari atas saat senja"
                    eyebrow="Ekowisata Bahari"
                    title="Selami pesona Waduk Manduk"
                    subtitle="Dukung konservasi perairan, jelajahi ekosistem bawah air, dan bertemu UMKM pesisir yang menjaga tradisi kuliner setempat."
                    actions={[
                        {
                            label: 'Jelajahi Destinasi',
                            href: route('explore.index'),
                        },
                        {
                            label: 'Lihat Galeri',
                            href: route('community.index'),
                            variant: 'ghost',
                        },
                    ]}
                    media={
                        <div className="hero-media-stack">
                            <span className="hero-media-glow" aria-hidden />
                            <div className="hero-device hero-device--primary">
                                <div
                                    className="hero-device__screen"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=450&q=80')",
                                    }}
                                />
                            </div>
                            <div className="hero-device hero-device--secondary">
                                <div
                                    className="hero-device__screen"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=450&q=80')",
                                    }}
                                />
                            </div>
                        </div>
                    }
                >
                    <div className="hero-quick-panel">
                        <div className="hero-quick-panel__inner">
                            <div className="hero-status-card">
                                {status ? (
                                    <StatusBanner
                                        crowd_level={status.crowd_level}
                                        weather_summary={status.weather_summary}
                                        temperature={status.temperature}
                                        advisory={status.advisory}
                                        startLabel="Status kunjungan"
                                        tone="dark"
                                    />
                                ) : (
                                    <div className="space-y-4">
                                        <p className="eyebrow text-xs text-on-media/70">Status kunjungan</p>
                                        <p className="text-sm text-on-media-muted">
                                            Informasi keramaian, cuaca, dan imbauan keselamatan akan tampil otomatis setelah dipublikasikan admin.
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="hero-quick-links">
                                <div className="hero-quick-links__header">
                                    <p className="eyebrow text-xs text-on-media/80">Bantuan cepat</p>
                                    <p className="text-sm text-on-media-muted">
                                        Persiapkan perjalanan Anda dengan panduan penting sebelum bertolak ke Manduk.
                                    </p>
                                </div>
                                <div className="hero-quick-links__grid">
                                    {heroQuickLinks.map((item) => (
                                        <a key={item.href} href={item.href} className="hero-quick-card focus-ring">
                                            <span className="hero-quick-card__icon" aria-hidden>
                                                {item.icon}
                                            </span>
                                            <div className="hero-quick-card__body">
                                                <h3 className="text-sm font-semibold text-on-media line-2">{item.title}</h3>
                                                <p className="text-xs text-on-media-muted line-3">{item.description}</p>
                                                <span className="hero-quick-card__cta">
                                                    Pelajari lebih lanjut
                                                    <span aria-hidden>→</span>
                                                </span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Hero>
            }
        >
            <Head title="Beranda">
                <meta
                    name="description"
                    content="Temukan status kunjungan, agenda, dan sorotan konservasi Waduk Manduk langsung dari data admin."
                />
                <meta property="og:title" content="Waduk Manduk – Ekowisata Bahari" />
                <meta
                    property="og:description"
                    content="Jelajahi ekowisata bahari, dukung UMKM pesisir, dan dapatkan info kunjungan terbaru Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('home')} />
            </Head>
            <section className="home-overview-section">
                <div className="container">
                    <div className="home-overview-grid">
                        <div className="home-overview-card">
                            <p className="eyebrow text-xs text-on-dark/80">Manduk dalam angka</p>
                            <div className="mt-5 grid gap-4 sm:grid-cols-3">
                                {heroHighlights.map((highlight) => (
                                    <div key={highlight.label} className="space-y-2">
                                        <p className="text-3xl font-semibold text-on-dark">{highlight.value}</p>
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-dark/70">
                                            {highlight.label}
                                        </p>
                                        <p className="text-xs text-on-dark/70">{highlight.caption}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="home-overview-card home-overview-card--accent">
                            <p className="eyebrow text-xs text-brand-900/70">Rencanakan perjalanan</p>
                            <h2 className="mt-4 text-h3 text-brand-900">Siapkan kunjungan ramah lingkungan</h2>
                            <p className="mt-3 text-sm text-brand-900/80">
                                Gunakan layanan reservasi untuk mengatur kuota harian dan pilih paket edukasi konservasi yang
                                paling sesuai dengan rombongan Anda.
                            </p>
                            <div className="home-overview-actions">
                                <Link
                                    href={route('visit.plan')}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-on-dark transition hover:bg-brand-800"
                                >
                                    Reservasi wisata
                                    <span aria-hidden>→</span>
                                </Link>
                                <Link href={route('support.index')} className="link focus-ring text-sm text-brand-900">
                                    Lihat panduan pengunjung →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative bg-surface-0 py-16 lg:py-24">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container relative space-y-12">
                    <div className="rounded-[32px] border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                        <p className="eyebrow text-xs text-brand-600">Pengalaman konservasi</p>
                        <h2 className="mt-3 text-h2 text-text-primary">Jelajah ekosistem bahari bersama pemandu lokal</h2>
                        <p className="mt-3 max-w-3xl text-text-secondary">
                            Program interpretasi Waduk Manduk dirancang agar setiap kunjungan memberi dampak positif bagi lingkungan dan masyarakat pesisir.
                        </p>
                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {experienceHighlights.map((item) => (
                                <div
                                    key={item.title}
                                    className="flex flex-col gap-3 rounded-3xl border border-surface-2 bg-surface-1 p-5 shadow-soft/20"
                                >
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-2xl">
                                        {item.icon}
                                    </span>
                                    <p className="text-base font-semibold text-text-primary">{item.title}</p>
                                    <p className="text-sm text-text-secondary">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href={route('visit.plan')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-on-dark transition hover:bg-brand-500"
                            >
                                Rencanakan kunjungan
                            </Link>
                            <Link href={route('support.index')} className="link focus-ring text-sm">
                                Dukung konservasi →
                            </Link>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="eyebrow text-xs text-brand-600">Sorotan komunitas</p>
                                <h2 className="text-h3 text-text-primary">Destinasi &amp; UMKM unggulan</h2>
                            </div>
                            <Link href={route('umkm.directory')} className="link focus-ring text-sm">
                                Lihat direktori lengkap →
                            </Link>
                        </div>
                        {featuredSpots.length || featuredUmkm.length ? (
                            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                {featuredSpots.slice(0, 2).map((spot) => (
                                    <SpotCard key={`spot-${spot.id}`} {...spot} />
                                ))}
                                {featuredUmkm.slice(0, 2).map((item) => (
                                    <UmkmCard key={`umkm-${item.id}`} {...item} />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-6 text-sm text-text-secondary">
                                Sorotan destinasi akan tampil setelah konten dipublikasikan melalui panel admin.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-brand-900 py-16 text-on-media lg:py-20">
                <span
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(66,198,193,0.25),transparent_65%)]"
                />
                <span
                    aria-hidden
                    className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,18,41,0.95)_0%,rgba(3,32,72,0.9)_45%,rgba(2,18,41,0.95)_100%)]"
                />
                <div className="container space-y-8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="eyebrow text-xs text-on-media/80">Agenda konservasi & budaya</p>
                            <h2 className="text-h2 text-on-media">Jadwal kegiatan terdekat</h2>
                        </div>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-on-media transition hover:text-accent-300"
                        >
                            Semua agenda
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                    {upcomingEvents.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} tone="dark" />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-on-media-muted">
                            Belum ada agenda terjadwal. Tambahkan event melalui admin untuk menampilkannya di sini.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(242,169,54,0.2),transparent_70%)]"
                />
                <div className="container space-y-8">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="eyebrow text-xs text-brand-600">Cerita terbaru</p>
                            <h2 className="text-h2 text-text-primary">Update dari lapangan</h2>
                        </div>
                        <Link href={route('stories.index')} className="link focus-ring text-sm">
                            Semua berita →
                        </Link>
                    </div>
                    {recentStories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {recentStories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">
                            Belum ada artikel yang terbit. Cerita akan muncul otomatis setelah diterbitkan di admin.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
