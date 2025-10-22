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
                    {status && (
                        <div className="max-w-xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-soft">
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

            <section className="py-12 lg:py-16">
                <div className="container">
                    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                        <div className="space-y-8">
                            <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                                <p className="eyebrow text-xs text-brand-600">Pengalaman konservasi</p>
                                <h2 className="mt-3 text-h2 text-text-primary">
                                    Jelajah ekosistem bahari bersama pemandu lokal
                                </h2>
                                <p className="mt-3 text-text-secondary">
                                    Program interpretasi Waduk Manduk dirancang agar setiap kunjungan memberi dampak positif bagi lingkungan dan masyarakat pesisir.
                                </p>
                                <ul className="mt-5 grid gap-3 text-sm text-text-secondary md:grid-cols-2">
                                    <li className="rounded-2xl border border-surface-2 bg-surface-1 p-4">Tur snorkeling konservasi</li>
                                    <li className="rounded-2xl border border-surface-2 bg-surface-1 p-4">Pelayaran senja &amp; observasi burung</li>
                                    <li className="rounded-2xl border border-surface-2 bg-surface-1 p-4">Monitoring kualitas air real-time</li>
                                    <li className="rounded-2xl border border-surface-2 bg-surface-1 p-4">Kurasi UMKM kuliner pesisir</li>
                                </ul>
                                <div className="mt-6 flex flex-wrap gap-3">
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

                            <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
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
                    <div className="mt-8 lg:hidden">
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan cepat"
                            description="Temukan informasi penting sebelum menjejakkan kaki di Waduk Manduk."
                        />
                    </div>
                </div>
            </section>

            <section className="bg-surface-1 py-12 lg:py-16">
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="eyebrow text-xs text-brand-600">Agenda konservasi & budaya</p>
                            <h2 className="text-h2 text-text-primary">Jadwal kegiatan terdekat</h2>
                        </div>
                        <Link href={route('visit.plan')} className="link focus-ring text-sm">
                            Semua agenda →
                        </Link>
                    </div>
                    {upcomingEvents.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">
                            Belum ada agenda terjadwal. Tambahkan event melalui admin untuk menampilkannya di sini.
                        </p>
                    )}
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container space-y-6">
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
