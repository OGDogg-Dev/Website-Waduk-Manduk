import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Compass, Leaf, LifeBuoy, Waves } from 'lucide-react';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { HomeHero } from '@/components/public/sections/home/home-hero';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PublicLayout } from '@/layouts/public/public-layout';
import type {
    EventResource,
    SpotResource,
    StatusResource,
    StoryResource,
    UmkmResource,
} from '@/types/public';

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
            title: 'Jam operasional & tiket terpadu',
            description: 'Ketahui kapasitas harian, paket rombongan, serta alur reservasi daring yang terintegrasi.',
        },
        {
            href: route('visit.plan'),
            title: 'Fasilitas ramah keluarga & difabel',
            description: 'Pelajari akses dermaga, ruang laktasi, hingga jalur landai untuk kursi roda di seluruh zona.',
        },
        {
            href: route('explore.index'),
            title: 'Peta interaktif destinasi & UMKM',
            description: 'Gunakan peta untuk menemukan spot snorkeling, jalur mangrove, dan kios kuliner pesisir.',
        },
    ];

    const stewardshipHighlights = [
        {
            title: 'Interpretasi konservasi terpadu',
            description:
                'Materi edukasi disusun kolaboratif bersama nelayan, pemandu selam, dan peneliti ekologi setempat.',
        },
        {
            title: 'Operasional rendah emisi',
            description:
                'Armada wisata memanfaatkan panel surya serta pengelolaan sampah terpadu di setiap dermaga.',
        },
        {
            title: 'Kolaborasi UMKM pesisir',
            description:
                'Kurasi produk dilakukan melalui program pemberdayaan dan pelatihan keamanan pangan tahunan.',
        },
    ];

    const discoveryPrograms = [
        {
            icon: Compass,
            title: 'Tur interpretasi bawah air',
            description: 'Pandu profesional akan menemani perjalanan menyelam menyusuri terumbu dan koridor ikan endemik.',
            href: route('explore.index'),
        },
        {
            icon: Waves,
            title: 'Eksplorasi mangrove dan susur rawa',
            description: 'Nikmati aktivitas kano senja sambil memantau biodiversitas mangrove bersama warga pesisir.',
            href: route('explore.index'),
        },
        {
            icon: Leaf,
            title: 'Laboratorium hidup pesisir',
            description: 'Kegiatan edukasi untuk pelajar tentang mitigasi abrasi, transplantasi karang, dan kebersihan waduk.',
            href: route('support.index'),
        },
    ];

    const visitorSteps = [
        {
            title: 'Rencanakan kunjungan',
            description: 'Sesuaikan jadwal dengan kapasitas harian, cuaca, dan rekomendasi jalur konservasi yang tersedia.',
            href: route('visit.plan'),
        },
        {
            title: 'Dukung ekonomi lokal',
            description: 'Belanja langsung dari UMKM pesisir yang menampilkan kuliner laut dan kriya berbasis bahan alami.',
            href: route('umkm.directory'),
        },
        {
            title: 'Terapkan panduan konservasi',
            description: 'Ikuti arahan pemandu, gunakan sunscreen ramah karang, dan bantu jaga kebersihan destinasi.',
            href: route('support.index'),
        },
    ];

    return (
        <PublicLayout hero={<HomeHero status={status} quickHelpItems={quickHelpItems} />}>
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

            <section className="relative overflow-hidden bg-surface-0 py-20 lg:py-[6.5rem]">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[30rem] rounded-full bg-brand-200/20 blur-[120px]" aria-hidden />
                <div className="absolute inset-x-[-30vw] bottom-[-30%] h-[36rem] rounded-[48rem] bg-gradient-to-r from-accent-200/40 via-accent-100/40 to-brand-100/40 blur-3xl" aria-hidden />
                <div className="container relative grid gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Narasi konservasi</p>
                            <h2 className="text-h2 text-text-primary">Program edukasi lapangan yang tersusun rapi</h2>
                            <p className="text-text-secondary">
                                Setiap kunjungan dirancang untuk mempertemukan wisatawan dengan cerita konservasi. Materi edukasi, perangkat keselamatan, hingga jalur interpretasi tersusun sistematis di bawah koordinasi tim Waduk Manduk.
                            </p>
                        </div>
                        <ul className="grid gap-5 sm:grid-cols-2">
                            {stewardshipHighlights.map((item) => (
                                <li key={item.title} className="flex gap-4 rounded-[2rem] border border-surface-3/80 bg-white/80 p-6 shadow-soft backdrop-blur">
                                    <span className="mt-1 inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-soft">
                                        <CheckCircle2 className="h-5 w-5" aria-hidden />
                                    </span>
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold text-text-primary">{item.title}</p>
                                        <p className="text-sm text-text-secondary">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="grid gap-6">
                        {discoveryPrograms.map((program) => (
                            <Link
                                key={program.title}
                                href={program.href}
                                className="focus-ring group relative overflow-hidden rounded-[2.3rem] border border-brand-200/70 bg-gradient-to-br from-white via-surface-0 to-brand-50 p-7 shadow-soft transition hover:-translate-y-1 hover:border-brand-300"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-on-dark shadow-soft">
                                        <program.icon className="h-6 w-6" aria-hidden />
                                    </span>
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold text-text-primary">{program.title}</p>
                                        <p className="text-sm text-text-secondary line-3">{program.description}</p>
                                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                                            Jelajahi program
                                            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="absolute right-[-40px] top-1/2 hidden h-[120%] w-[160px] -translate-y-1/2 rounded-full bg-gradient-to-b from-brand-200/30 via-accent-200/30 to-transparent blur-3xl sm:block" aria-hidden />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-b from-brand-970 via-brand-950 to-brand-980 py-20 text-on-dark lg:py-[6.5rem]">
                <div className="absolute inset-x-[-20%] top-[-35%] h-[28rem] rounded-full bg-accent-400/25 blur-[150px]" aria-hidden />
                <div className="absolute inset-x-[-10%] bottom-[-25%] h-[32rem] rounded-full bg-brand-800/30 blur-[180px]" aria-hidden />
                <div className="container relative space-y-12">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-200/80">Sorotan destinasi</p>
                            <h2 className="text-h2 text-white">Eksplorasi spot terbaik &amp; UMKM unggulan</h2>
                            <p className="text-sm text-accent-100/90">
                                Kurasi lokasi snorkeling, jalur konservasi, hingga kios kuliner hasil laut berkelanjutan yang bisa Anda dukung.
                            </p>
                        </div>
                        <Link
                            href={route('umkm.directory')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-white/40 hover:bg-white/10"
                        >
                            Direktori lengkap
                        </Link>
                    </div>
                    {featuredSpots.length || featuredUmkm.length ? (
                        <div className="grid gap-6 lg:grid-cols-2">
                            {featuredSpots.slice(0, 2).map((spot) => (
                                <SpotCard key={`spot-${spot.id}`} {...spot} className="bg-white/95 text-brand-900" />
                            ))}
                            {featuredUmkm.slice(0, 2).map((item) => (
                                <UmkmCard key={`umkm-${item.id}`} {...item} className="bg-white/95 text-brand-900" />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[2.5rem] border border-white/20 bg-white/10 p-8 text-sm text-accent-100/90">
                            Sorotan destinasi akan tampil setelah konten dipublikasikan melalui panel admin.
                        </div>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-20 lg:py-[6.5rem]">
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-900/10 to-transparent" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Agenda konservasi &amp; budaya</p>
                            <h2 className="text-h2 text-text-primary">Jadwal kegiatan terdekat</h2>
                            <p className="text-text-secondary">
                                Ikuti workshop konservasi, susur waduk tematik, hingga festival budaya tahunan.
                            </p>
                        </div>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-900"
                        >
                            Semua agenda →
                        </Link>
                    </div>
                    {upcomingEvents.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} className="bg-white" />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[2.5rem] border border-dashed border-brand-200 bg-white/70 p-8 text-sm text-text-secondary">
                            Belum ada agenda terjadwal. Tambahkan event melalui admin untuk menampilkannya di sini.
                        </div>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-0 py-20 lg:py-[6.5rem]">
                <div className="container space-y-16">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] lg:items-center">
                        <div className="space-y-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Panduan berkunjung bertanggung jawab</p>
                            <h2 className="text-h2 text-text-primary">Tiga langkah agar pengalaman Anda berdampak baik</h2>
                            <p className="text-text-secondary">
                                Setiap aktivitas di Waduk Manduk memprioritaskan keselamatan, konservasi, dan keberlanjutan ekonomi lokal. Ikuti tahapan berikut sebelum berangkat.
                            </p>
                            <div className="space-y-4">
                                {visitorSteps.map((step) => (
                                    <Link
                                        key={step.title}
                                        href={step.href}
                                        className="focus-ring group flex gap-4 rounded-[2.3rem] border border-surface-3/80 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200"
                                    >
                                        <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                                            <LifeBuoy className="h-5 w-5" aria-hidden />
                                        </span>
                                        <div className="space-y-2">
                                            <p className="text-base font-semibold text-text-primary">{step.title}</p>
                                            <p className="text-sm text-text-secondary">{step.description}</p>
                                            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-700">
                                                Pelajari panduan
                                                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-100/60 via-accent-100/40 to-transparent blur-2xl" aria-hidden />
                            <div className="rounded-[2.7rem] border border-brand-200/80 bg-gradient-to-br from-brand-50 via-white to-accent-50 p-8 shadow-soft">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-500">Status lokasi terbaru</p>
                                <p className="mt-4 text-lg font-semibold text-text-primary">
                                    Pantau kondisi waduk sebelum berangkat agar aktivitas konservasi berjalan aman dan nyaman.
                                </p>
                                <div className="mt-6">
                                    <StatusBanner
                                        tone="light"
                                        crowd_level={status?.crowd_level}
                                        weather_summary={status?.weather_summary}
                                        temperature={status?.temperature}
                                        advisory={status?.advisory}
                                        reported_at={status?.reported_at ?? undefined}
                                        valid_until={status?.valid_until ?? undefined}
                                    />
                                </div>
                                <p className="mt-6 text-sm text-text-secondary">
                                    Pusat kontrol akan memberi notifikasi ketika kondisi lapangan berubah melalui kanal media sosial resmi.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Cerita terbaru</p>
                                <h2 className="text-h2 text-text-primary">Update dari lapangan</h2>
                            </div>
                            <Link
                                href={route('stories.index')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-900"
                            >
                                Semua berita →
                            </Link>
                        </div>
                        {recentStories.length ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {recentStories.map((story) => (
                                    <StoryCard key={`story-${story.id}`} {...story} className="bg-white" />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[2.5rem] border border-dashed border-brand-200 bg-white/70 p-8 text-sm text-text-secondary">
                                Belum ada artikel yang terbit. Cerita akan muncul otomatis setelah diterbitkan di admin.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-brand-980 py-20 text-on-dark lg:py-[6rem]">
                <div className="absolute inset-x-[-15%] top-[-25%] h-[26rem] rounded-full bg-accent-500/20 blur-[150px]" aria-hidden />
                <div className="container relative">
                    <div className="rounded-[3rem] border border-white/15 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-10 shadow-soft backdrop-blur">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:items-center">
                            <div className="space-y-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-200/80">Ikuti kabar terbaru</p>
                                <h2 className="text-h3 font-semibold text-white">Terhubung dengan pusat informasi Waduk Manduk</h2>
                                <p className="text-sm text-accent-100/90">
                                    Dapatkan pengumuman status kunjungan, cerita konservasi, dan agenda terbaru langsung dari tim pengelola.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 lg:justify-end">
                                <Link
                                    href={route('community.index')}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-on-media transition hover:border-white/40 hover:bg-white/15"
                                >
                                    Lihat galeri komunitas
                                </Link>
                                <Link
                                    href={route('support.index')}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 text-sm font-semibold text-brand-950 shadow-soft transition hover:-translate-y-0.5 hover:bg-accent-300"
                                >
                                    Hubungi pusat informasi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
