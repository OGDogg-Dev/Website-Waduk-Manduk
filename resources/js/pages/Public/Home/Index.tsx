import { Head, Link } from '@inertiajs/react';
import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
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
    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Jam operasional & tiket',
            description: 'Ketahui jam kunjung, kapasitas harian, serta opsi tiket terpadu dan paket edukasi.',
        },
        {
            href: route('visit.plan'),
            title: 'Fasilitas ramah keluarga',
            description: 'Lihat fasilitas aksesibilitas, pantry komunitas, serta area picnic yang tersedia.',
        },
        {
            href: route('explore.index'),
            title: 'Peta & rute ke lokasi',
            description: 'Gunakan peta interaktif untuk menemukan dermaga masuk, jalur konservasi, dan UMKM.',
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
                >
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:max-w-5xl">
                        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-sm">
                            {status ? (
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status lokasi terbaru"
                                    tone="dark"
                                />
                            ) : (
                                <div className="space-y-4">
                                    <p className="text-sm font-semibold uppercase tracking-[0.32em] text-on-media/80">
                                        Status lokasi terbaru
                                    </p>
                                    <p className="text-sm text-on-media-muted">
                                        Informasi keramaian, cuaca, dan imbauan keselamatan akan tampil otomatis setelah dipublikasikan admin.
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="home-rings rounded-[28px] border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-on-media/80">
                                    Manduk dalam angka
                                </p>
                                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                                    {heroHighlights.map((highlight) => (
                                        <div key={highlight.label} className="space-y-1">
                                            <p className="text-2xl font-semibold text-on-media">{highlight.value}</p>
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-on-media/70">
                                                {highlight.label}
                                            </p>
                                            <p className="text-xs text-on-media-muted">{highlight.caption}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-[28px] border border-white/15 bg-brand-900/70 p-6 shadow-soft backdrop-blur-sm">
                                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-on-media/80">
                                    Pesan konservasi
                                </p>
                                <p className="mt-3 text-sm text-on-media-muted">
                                    Setiap tiket yang Anda beli mendanai restorasi terumbu, literasi pesisir, dan pemantauan kualitas air Manduk.
                                </p>
                                <Link href={route('support.index')} className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-brand-900 shadow-soft transition hover:bg-accent-400">
                                    Lihat program konservasi
                                    <span aria-hidden>→</span>
                                </Link>
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
            <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container relative">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
                        <div className="space-y-10">
                            <div className="rounded-[32px] border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                                <p className="eyebrow text-xs text-brand-600">Pengalaman konservasi</p>
                                <h2 className="mt-3 text-h2 text-text-primary">
                                    Jelajah ekosistem bahari bersama pemandu lokal
                                </h2>
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
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan cepat"
                            description="Temukan informasi penting sebelum menjejakkan kaki di Waduk Manduk."
                            className="hidden lg:block"
                        />
                    </div>
                    <div className="mt-10 lg:hidden">
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan cepat"
                            description="Temukan informasi penting sebelum menjejakkan kaki di Waduk Manduk."
                        />
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
