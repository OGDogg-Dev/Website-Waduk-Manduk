import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, Compass, Leaf, Waves } from 'lucide-react';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { WaveDivider } from '@/components/public/WaveDivider';
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

            <section
                id="fitur-sipari"
                aria-labelledby="fitur-sipari-heading"
                className="relative overflow-hidden bg-surface-0 py-20 lg:py-[6rem]"
            >
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[26rem] rounded-full bg-brand-200/30 blur-[140px]" aria-hidden />
                <div className="absolute inset-x-[-25%] bottom-[-22rem] h-[28rem] rounded-full bg-accent-300/20 blur-[150px]" aria-hidden />
                <div className="container relative space-y-12">
                    <div className="mx-auto max-w-3xl space-y-3 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Integrasi layanan</span>
                        <h2 id="fitur-sipari-heading" className="text-h2 text-text-primary">
                            Triplet layanan SIPARI Manduk
                        </h2>
                        <p className="text-text-secondary">
                            Pilih jalur eksplorasi, pelajari konservasi, dan dukung UMKM hanya dalam satu ekosistem digital Waduk Manduk.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {discoveryPrograms.map((program) => (
                            <Link
                                key={program.title}
                                href={program.href}
                                className="focus-ring group flex h-full flex-col gap-4 rounded-[2.5rem] border border-brand-200/60 bg-white/90 p-8 shadow-soft transition hover:-translate-y-1 hover:border-brand-300"
                                aria-label={`${program.title} – ${program.description}`}
                            >
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-on-dark shadow-soft transition group-hover:scale-105">
                                    <program.icon className="h-6 w-6" aria-hidden />
                                </span>
                                <div className="space-y-3">
                                    <p className="text-base font-semibold text-text-primary">{program.title}</p>
                                    <p className="text-sm text-text-secondary line-3">{program.description}</p>
                                </div>
                                <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                                    Jelajahi program
                                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section
                id="sorotan-destinasi"
                aria-labelledby="sorotan-destinasi-heading"
                className="relative overflow-hidden bg-gradient-to-b from-surface-0 via-surface-1 to-surface-2 py-20 lg:py-[6.5rem]"
            >
                <div className="absolute inset-x-[-20%] top-[-16rem] h-[24rem] rounded-full bg-brand-300/25 blur-[180px]" aria-hidden />
                <div className="container relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Sorotan destinasi</span>
                            <h2 id="sorotan-destinasi-heading" className="text-h2 text-text-primary">
                                Wawasan konservasi dan ekonomi pesisir
                            </h2>
                            <p className="text-text-secondary">
                                Sorotan kurasi tim lapangan tentang interpretasi konservasi, operasional ramah lingkungan, dan kolaborasi UMKM binaan.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {stewardshipHighlights.map((item) => (
                                <li key={item.title} className="flex gap-4 rounded-3xl border border-surface-3/80 bg-white p-5 shadow-soft">
                                    <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                                        <CheckCircle2 className="h-5 w-5" aria-hidden />
                                    </span>
                                    <div className="space-y-2">
                                        <p className="text-base font-semibold text-text-primary">{item.title}</p>
                                        <p className="text-sm text-text-secondary">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('explore.index')}
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-brand-200 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-400 hover:text-brand-900"
                        >
                            Direktori lengkap destinasi
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {featuredSpots.slice(0, 2).map((spot) => (
                            <SpotCard key={`spot-${spot.id}`} {...spot} className="bg-white" />
                        ))}
                        {featuredUmkm.slice(0, 2).map((item) => (
                            <UmkmCard key={`umkm-${item.id}`} {...item} className="bg-white" />
                        ))}
                        {!featuredSpots.length && !featuredUmkm.length && (
                            <div className="rounded-[2.5rem] border border-dashed border-brand-200/70 bg-white/80 p-8 text-sm text-text-secondary">
                                Sorotan destinasi akan tampil setelah konten dipublikasikan melalui panel admin.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <WaveDivider variant="brand" className="text-brand-900" />

            <section
                id="agenda-program"
                aria-labelledby="agenda-program-heading"
                className="relative overflow-hidden bg-brand-900 text-on-dark py-20 lg:py-[6rem]"
            >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(40,93,168,0.25)_0%,transparent_65%)]" aria-hidden />
                <div className="container relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.85fr)]">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/90">Agenda konservasi &amp; budaya</span>
                            <h2 id="agenda-program-heading" className="text-h2 text-on-dark">
                                Jadwal kegiatan terdekat
                            </h2>
                            <p className="text-sm text-on-media-muted">
                                Ikuti workshop konservasi, tur interpretasi, hingga program pemberdayaan UMKM yang dijadwalkan tim SIPARI.
                            </p>
                        </div>
                        {upcomingEvents.length ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {upcomingEvents.slice(0, 4).map((event) => (
                                    <EventCard key={`event-${event.id}`} {...event} className="bg-white/90 text-text-primary" />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-[2.5rem] border border-white/20 bg-white/10 p-8 text-sm text-on-media-muted">
                                Belum ada agenda terjadwal. Tambahkan event melalui admin untuk menampilkannya di sini.
                            </div>
                        )}
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-on-media transition hover:border-white/40 hover:bg-white/10"
                        >
                            Lihat kalender lengkap
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                    <aside
                        className="space-y-6 rounded-[2.75rem] border border-white/18 bg-white/10 p-6 shadow-soft backdrop-blur"
                        aria-labelledby="panel-panduan-heading"
                    >
                        <div className="space-y-2">
                            <h3 id="panel-panduan-heading" className="text-base font-semibold text-on-media">
                                Panduan kedatangan bertanggung jawab
                            </h3>
                            <p className="text-sm text-on-media-muted">
                                Pastikan kesiapan tim dan dukung ekonomi lokal sebelum berangkat.
                            </p>
                        </div>
                        {status ? (
                            <StatusBanner
                                tone="dark"
                                crowd_level={status.crowd_level}
                                weather_summary={status.weather_summary}
                                temperature={status.temperature}
                                advisory={status.advisory}
                                reported_at={status.reported_at}
                                valid_until={status.valid_until}
                                startLabel="Status lokasi terkini"
                            />
                        ) : (
                            <p className="rounded-3xl border border-dashed border-white/25 bg-white/10 px-4 py-5 text-sm text-on-media-muted">
                                Status kunjungan akan diperbarui otomatis oleh tim lapangan ketika tersedia.
                            </p>
                        )}
                        <ol className="space-y-3" aria-label="Langkah kunjungan">
                            {visitorSteps.map((step, index) => (
                                <li key={step.title}>
                                    <Link
                                        href={step.href}
                                        className="focus-ring group flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
                                    >
                                        <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-400 text-xs font-semibold text-brand-950">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-on-media">{step.title}</p>
                                            <p className="mt-1 text-sm text-on-media-muted line-3">{step.description}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </aside>
                </div>
            </section>

            <section
                id="artikel-terbaru"
                aria-labelledby="artikel-terbaru-heading"
                className="relative overflow-hidden bg-surface-0 py-20 lg:py-[6rem]"
            >
                <div className="container space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Cerita terbaru</span>
                            <h2 id="artikel-terbaru-heading" className="text-h2 text-text-primary">
                                Update dari lapangan
                            </h2>
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
            </section>

            <section className="relative overflow-hidden bg-brand-950 py-20 text-on-dark lg:py-[6rem]">
                <div className="absolute inset-x-[-15%] top-[-25%] h-[26rem] rounded-full bg-accent-400/25 blur-[150px]" aria-hidden />
                <div className="container relative">
                    <div className="rounded-[3rem] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))] p-10 shadow-soft backdrop-blur">
                        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:items-center">
                            <div className="space-y-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-300/90">Ikuti kabar terbaru</p>
                                <h2 className="text-h3 font-semibold text-on-dark">Terhubung dengan pusat informasi Waduk Manduk</h2>
                                <p className="text-sm text-on-media-muted">
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
