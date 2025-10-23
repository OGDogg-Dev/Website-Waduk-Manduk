import { Head, Link } from '@inertiajs/react';
import { Check, Compass, Quote, Store } from 'lucide-react';
import { EventCard } from '@/components/public/cards/event-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { WaveDivider } from '@/components/public/WaveDivider';
import { HomeHero } from '@/components/public/sections/home/home-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { storageUrl } from '@/lib/storage';
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

type RawShowcaseItem = {
    id: string;
    title: string;
    category: string;
    image: string | null;
    href: string;
};

type ShowcaseItem = Omit<RawShowcaseItem, 'image'> & { image: string };

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

    const experienceHighlights = [
        {
            title: 'Pemandu bersertifikat',
            description:
                'Setiap tur diawali dengan briefing konservasi oleh pemandu lokal yang tersertifikasi untuk menjaga habitat.',
        },
        {
            title: 'Fasilitas ramah keluarga',
            description:
                'Dermaga landai, ruang laktasi, serta jalur kursi roda memastikan semua pengunjung merasa nyaman.',
        },
        {
            title: 'Kuliner pesisir autentik',
            description:
                'Nikmati paket makan siang hasil olahan UMKM mitra dengan bahan segar dari nelayan Manduk.',
        },
    ];

    const testimonials = [
        {
            quote: 'Perjalanan snorkeling di Manduk sangat edukatif. Pemandunya sabar menjelaskan peran mangrove dan terumbu.',
            name: 'Sari Amelia',
            detail: 'Komunitas Selam Surabaya',
        },
        {
            quote: 'Kami membawa anak usia 5 tahun dan fasilitasnya lengkap. Jalur landai dan ruang laktasi sangat membantu.',
            name: 'Rizal & Dina',
            detail: 'Pengunjung keluarga',
        },
        {
            quote: 'UMKM binaan Manduk punya kurasi produk yang apik, cocok dijadikan hampers khas pesisir.',
            name: 'Valen Pratama',
            detail: 'Food blogger',
        },
        {
            quote: 'Tim konservasi menjelaskan data riset dengan visual menarik, membuat anak-anak lebih peduli ekosistem.',
            name: 'Nurmawati',
            detail: 'Guru SDN Bahari 1',
        },
    ];

    const rawShowcase: RawShowcaseItem[] = [
        ...featuredSpots.map((spot) => ({
            id: `spot-${spot.id}`,
            title: spot.name,
            category: spot.type || 'Spot',
            image: storageUrl(spot.hero_image),
            href: route('explore.index'),
        })),
        ...featuredUmkm.map((item) => ({
            id: `umkm-${item.id}`,
            title: item.name,
            category: item.category || 'UMKM',
            image: storageUrl(item.hero_image),
            href: route('umkm.directory'),
        })),
    ];

    const showcaseItems: ShowcaseItem[] = rawShowcase
        .filter((item): item is ShowcaseItem => Boolean(item.image))
        .slice(0, 6)
        .map((item) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            image: item.image,
            href: item.href,
        }));

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
                id="pengalaman"
                aria-labelledby="pengalaman-heading"
                className="relative overflow-hidden bg-surface-0 py-24 lg:py-28"
            >
                <div className="absolute inset-x-[-25%] top-[-14rem] h-[26rem] rounded-full bg-sky-200/40 blur-[160px]" aria-hidden />
                <div className="absolute inset-x-[-25%] bottom-[-18rem] h-[28rem] rounded-full bg-gold-500/20 blur-[180px]" aria-hidden />
                <div className="container relative grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/60 bg-white/80 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-brand-600">
                                Pengalaman Pengunjung
                            </span>
                            <h2 id="pengalaman-heading" className="text-h2 text-text-primary">
                                Ekspedisi bahari yang hangat dan berkelanjutan
                            </h2>
                            <p className="text-lg text-text-secondary">
                                Tim Waduk Manduk menyiapkan pengalaman menyeluruh: edukasi konservasi, fasilitas nyaman, dan kolaborasi erat dengan UMKM pesisir.
                            </p>
                        </div>
                        <ul className="grid gap-4 sm:grid-cols-2">
                            {experienceHighlights.map((item) => (
                                <li key={item.title} className="flex gap-3 rounded-3xl border border-brand-200/50 bg-white/90 p-5 shadow-[0_22px_60px_rgba(9,36,66,0.08)]">
                                    <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-gold-500/80 text-brand-950">
                                        <Check className="h-4 w-4" aria-hidden />
                                    </span>
                                    <div className="space-y-1.5">
                                        <p className="text-base font-semibold text-text-primary">{item.title}</p>
                                        <p className="text-sm text-text-secondary line-3">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex w-max items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-950 shadow-[0_18px_40px_rgba(242,196,109,0.35)] transition hover:-translate-y-0.5"
                        >
                            Pelajari paket wisata
                            <Compass className="h-4 w-4" aria-hidden />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-10 top-10 hidden h-32 w-32 rounded-full bg-gold-500/30 blur-[80px] lg:block" aria-hidden />
                        <div className="absolute -right-12 bottom-0 hidden h-40 w-40 rounded-full bg-sky-200/45 blur-[100px] lg:block" aria-hidden />
                        <div className="relative grid gap-6 sm:grid-cols-2">
                            <div className="overflow-hidden rounded-[2.75rem] border border-brand-200/50 bg-white/90 p-6 shadow-[0_35px_90px_rgba(0,27,59,0.25)]">
                                <div className="overflow-hidden rounded-[2rem]">
                                    <img
                                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                        alt="Tur mangrove Waduk Manduk"
                                        className="h-64 w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">
                                    Tur Mangrove Senja
                                </p>
                                <p className="text-sm text-text-secondary">
                                    Eksplorasi kanal dengan kano, memantau burung air dan vegetasi mangrove.
                                </p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="overflow-hidden rounded-[2.5rem] border border-brand-200/50 bg-white/80 p-6 shadow-[0_30px_80px_rgba(0,27,59,0.18)]">
                                    <img
                                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
                                        alt="Kuliner UMKM pesisir"
                                        className="h-48 w-full rounded-[1.75rem] object-cover"
                                        loading="lazy"
                                    />
                                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.28em] text-brand-600">
                                        Kurasi Kuliner UMKM
                                    </p>
                                    <p className="text-sm text-text-secondary">
                                        Nikmati menu hasil laut segar dan kudapan tradisional khas Manduk.
                                    </p>
                                </div>
                                <div className="rounded-[2.5rem] border border-brand-200/40 bg-gradient-to-r from-brand-900/90 to-brand-700/70 p-6 text-white shadow-[0_35px_90px_rgba(0,27,59,0.35)]">
                                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">
                                        Dukungan konservasi
                                    </p>
                                    <p className="mt-3 text-lg font-semibold">
                                        Setiap tiket wisata menyumbang program rehabilitasi mangrove dan bank sampah Manduk.
                                    </p>
                                    <Link
                                        href={route('support.index')}
                                        className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:bg-white/20"
                                    >
                                        Lihat panduan konservasi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="sorotan-spot"
                aria-labelledby="sorotan-spot-heading"
                className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 py-24 text-on-dark"
            >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,76,129,0.35)_0%,transparent_70%)]" aria-hidden />
                <div className="container space-y-12">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">Sorotan spot &amp; UMKM</span>
                            <h2 id="sorotan-spot-heading" className="text-h2 text-white">
                                Jelajahi destinasi favorit dan mitra andalan
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href={route('explore.index')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition hover:border-white/50 hover:bg-white/10"
                            >
                                Lihat semua spot
                            </Link>
                            <Link
                                href={route('umkm.directory')}
                                className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-950 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
                            >
                                Lihat semua UMKM
                                <Store className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>
                    </div>
                    {showcaseItems.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {showcaseItems.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="group relative flex h-[22rem] flex-col justify-end overflow-hidden rounded-[2.75rem] border border-white/15 bg-brand-900/60 p-6 shadow-[0_32px_90px_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                                        loading={index === 0 ? 'eager' : 'lazy'}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-900/40 to-transparent" aria-hidden />
                                    <span className="relative inline-flex w-max items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-gold-300">
                                        {item.category}
                                    </span>
                                    <h3 className="relative mt-4 text-2xl font-semibold text-white line-2">{item.title}</h3>
                                    <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
                                        Selengkapnya
                                        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[2.75rem] border border-white/15 bg-white/5 p-10 text-sm text-white/70">
                            Sorotan destinasi akan tampil setelah tim konten menambahkan data spot atau UMKM unggulan.
                        </div>
                    )}
                </div>
                <WaveDivider variant="transparent" className="mt-16 text-white/20" />
            </section>

            <section
                id="agenda-program"
                aria-labelledby="agenda-program-heading"
                className="relative overflow-hidden bg-surface-0 py-24 lg:py-[6.5rem]"
            >
                <div className="absolute inset-x-[-25%] top-[-16rem] h-[24rem] rounded-full bg-sky-200/40 blur-[180px]" aria-hidden />
                <div className="container space-y-12">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-end">
                        <div className="space-y-4">
                            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Agenda &amp; komunitas</span>
                            <h2 id="agenda-program-heading" className="text-h2 text-text-primary">
                                Ikuti event edukatif dan gerakan komunitas
                            </h2>
                            <p className="text-text-secondary">
                                Dari workshop konservasi hingga festival kuliner pesisir, jadwal Manduk siap menginspirasi Anda untuk terlibat.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href={route('community.index')}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-brand-200 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 transition hover:border-brand-400 hover:text-brand-900"
                                >
                                    Gabung komunitas
                                </Link>
                                <Link
                                    href={route('visit.plan')}
                                    className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-950 shadow-[0_18px_45px_rgba(242,196,109,0.35)] transition hover:-translate-y-0.5"
                                >
                                    Lihat kalender lengkap
                                </Link>
                            </div>
                        </div>
                        {upcomingEvents.length ? (
                            <div className="overflow-x-auto">
                                <div className="grid min-w-[20rem] gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {upcomingEvents.slice(0, 6).map((event) => (
                                        <EventCard key={`event-${event.id}`} {...event} className="bg-white shadow-[0_28px_70px_rgba(0,27,59,0.12)]" />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-[2.75rem] border border-dashed border-brand-200/70 bg-white/80 p-10 text-sm text-text-secondary">
                                Jadwal event akan muncul setelah tim mempublikasikan kegiatan terbaru melalui panel admin.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section
                id="testimoni"
                aria-labelledby="testimoni-heading"
                className="relative overflow-hidden bg-surface-1 py-24 lg:py-[6.5rem]"
            >
                <div className="absolute inset-x-[-25%] top-[-12rem] h-[22rem] rounded-full bg-gold-300/35 blur-[180px]" aria-hidden />
                <div className="container space-y-12">
                    <div className="space-y-3 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Cerita pengunjung</span>
                        <h2 id="testimoni-heading" className="text-h2 text-text-primary">
                            Kenangan terbaik dari Manduk
                        </h2>
                        <p className="mx-auto max-w-3xl text-text-secondary">
                            Testimoni singkat dari pengunjung dan kolaborator yang telah merasakan pengalaman ekowisata bahari kami.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {testimonials.map((item) => (
                            <figure
                                key={item.name}
                                className="relative flex h-full flex-col gap-4 rounded-[2.5rem] border border-brand-200/50 bg-white p-6 shadow-[0_26px_70px_rgba(9,36,66,0.12)]"
                            >
                                <Quote className="h-8 w-8 text-gold-500" aria-hidden />
                                <blockquote className="text-sm text-text-secondary line-3">“{item.quote}”</blockquote>
                                <figcaption className="mt-auto space-y-1">
                                    <p className="text-base font-semibold text-text-primary">{item.name}</p>
                                    <p className="text-xs uppercase tracking-[0.28em] text-brand-500">{item.detail}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                    <Link
                        href={route('stories.index')}
                        className="focus-ring mx-auto inline-flex w-max items-center gap-2 rounded-full border border-brand-300 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 transition hover:border-brand-500 hover:text-brand-900"
                    >
                        Baca semua cerita
                    </Link>
                </div>
            </section>

            <section
                id="artikel-terbaru"
                aria-labelledby="artikel-terbaru-heading"
                className="relative overflow-hidden bg-surface-0 py-24 lg:py-[6.5rem]"
            >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(15,76,129,0.18)_0%,transparent_65%)]" aria-hidden />
                <div className="container space-y-12">
                    <div className="flex flex-col gap-4 text-center">
                        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Artikel &amp; dokumentasi</span>
                        <h2 id="artikel-terbaru-heading" className="text-h2 text-text-primary">
                            Update terbaru dari lapangan Manduk
                        </h2>
                        <p className="mx-auto max-w-3xl text-text-secondary">
                            Ikuti perkembangan konservasi, agenda warga, serta dokumentasi perjalanan melalui artikel dan cerita terbaru.
                        </p>
                    </div>
                    {recentStories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {recentStories.map((story, index) => (
                                <StoryCard
                                    key={`story-${story.id}`}
                                    {...story}
                                    className={`bg-white shadow-[0_24px_60px_rgba(9,36,66,0.1)] transition duration-300 ${index === 1 ? 'scale-[1.03]' : ''}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-[2.75rem] border border-dashed border-brand-200/70 bg-white/80 p-10 text-sm text-text-secondary">
                            Cerita akan muncul otomatis setelah tim menerbitkan artikel melalui panel admin.
                        </div>
                    )}
                    <Link
                        href={route('stories.index')}
                        className="focus-ring mx-auto inline-flex w-max items-center gap-2 rounded-full border border-brand-200 px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700 transition hover:border-brand-500 hover:text-brand-900"
                    >
                        Semua artikel
                        <span aria-hidden>→</span>
                    </Link>
                </div>
            </section>

            <section className="relative overflow-hidden bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 py-24 text-on-dark">
                <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml,%3Csvg width=\'320\' height=\'180\' viewBox=\'0 0 320 180\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 180H320V0C232 64 160 96 0 110V180Z\' fill=\'%23001b3b\'/%3E%3C/svg%3E')] opacity-40" aria-hidden />
                <div className="container relative">
                    <div className="rounded-[3.25rem] border border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.02))] p-10 shadow-[0_40px_110px_rgba(0,0,0,0.35)] backdrop-blur">
                        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
                            <div className="space-y-4">
                                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-200">Rencanakan perjalanan Anda</span>
                                <h2 className="text-h2 text-white">Wujudkan liburan bahari terbaik ke Waduk Manduk</h2>
                                <p className="text-sm text-white/75">
                                    Hubungi tim kami untuk paket khusus, koordinasi rombongan, atau kolaborasi kegiatan edukasi konservasi.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3 lg:justify-end">
                                <Link
                                    href={route('visit.plan')}
                                    className="focus-ring inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-950 shadow-[0_22px_55px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5"
                                >
                                    Reservasi sekarang
                                </Link>
                                <Link
                                    href={route('support.index')}
                                    className="focus-ring inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white/45 hover:bg-white/10"
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
