import { Head, Link } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StatusResource } from '@/types/public';

interface KontakPageProps {
    metrics: {
        spots: number;
        umkm: number;
        events: number;
        stories: number;
    };
    latestStatus: Array<Pick<StatusResource, 'crowd_level' | 'weather_summary' | 'reported_at' | 'advisory'>>;
}

const contactChannels = [
    { label: 'Whatsapp Center', value: '0813-1122-3344', href: 'https://wa.me/6281311223344' },
    { label: 'Telepon darurat', value: '(0341) 889-990', href: 'tel:+62341889990' },
    { label: 'Email layanan', value: 'halo@wadukmanduk.id', href: 'mailto:halo@wadukmanduk.id' },
    { label: 'Jam operasional', value: 'Setiap hari · 07.00 – 17.00 WIB' },
];

export default function KontakPage({ metrics, latestStatus = [] }: KontakPageProps) {
    const dateFormatter = new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    const stats = [
        {
            label: 'Spot terkelola',
            value: `${metrics.spots} lokasi`,
            description: 'Zona interpretasi bahari dengan fasilitas pemandu bersertifikat.',
        },
        {
            label: 'UMKM mitra',
            value: `${metrics.umkm} pelaku`,
            description: 'Kuliner pesisir dan kriya lokal yang dikurasi setiap musim.',
        },
        {
            label: 'Agenda komunitas',
            value: `${metrics.events} kegiatan`,
            description: 'Program edukasi konservasi lintas usia sepanjang tahun.',
        },
        {
            label: 'Arsip cerita',
            value: `${metrics.stories} artikel`,
            description: 'Rangkuman kabar konservasi, komunitas, dan UMKM Waduk Manduk.',
        },
    ];

    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Reservasi rombongan & sekolah',
            description: 'Atur jadwal kunjungan bersama tim reservasi resmi Waduk Manduk.',
        },
        {
            href: route('explore.index'),
            title: 'Peta interaktif destinasi',
            description: 'Telusuri jalur interpretasi, dermaga, hingga kios UMKM pesisir.',
        },
        {
            href: route('stories.index'),
            title: 'Pusat dokumentasi & berita',
            description: 'Dapatkan kabar konservasi, agenda komunitas, dan update status waduk.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Tentang Waduk Manduk">
                <meta
                    name="description"
                    content="Kenali ekowisata Waduk Manduk, status kunjungan terbaru, dan kanal komunikasi resmi pengelola."
                />
                <meta property="og:title" content="Tentang Ekowisata Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Informasi lengkap pengelola Waduk Manduk, status harian, dan kanal komunikasi warga."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('about.index')} />
            </Head>

            <PageHero
                eyebrow="Profil destinasi"
                title="Tentang Ekowisata Waduk Manduk"
                description="Inisiatif kolaboratif antara desa, nelayan, dan pemerhati ekosistem untuk menjaga waduk sebagai ruang wisata berkelanjutan yang lestari."
                actions={[
                    {
                        label: 'Hubungi WA pusat',
                        href: 'https://wa.me/6281311223344',
                        external: true,
                    },
                ]}
                stats={stats}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Bantuan cepat"
                quickHelpDescription="Hubungi tim kami atau akses panduan siap pakai untuk menyiapkan perjalanan Anda."
                quickHelpCta={{
                    label: 'Hubungi pusat informasi',
                    href: 'https://wa.me/6281311223344',
                    description: 'Whatsapp +62813-1122-3344',
                }}
            >
                <Breadcrumbs items={[{ label: 'Tentang' }]} className="mt-8" />
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-12rem] h-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(47,107,202,0.24),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-12">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Status terkini</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Pembaruan lapangan langsung dari petugas</h2>
                        <p className="max-w-3xl text-white/90">
                            Pantau kepadatan pengunjung, cuaca, dan imbauan keselamatan terakhir. Data dikirim setiap 30 menit oleh pusat kontrol Waduk Manduk.
                        </p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {latestStatus.length > 0 ? (
                            latestStatus.map((statusItem, index) => (
                                <article
                                    key={`status-${index}`}
                                    className="flex h-full flex-col gap-4 rounded-[2rem] border border-white/12 bg-white/6 p-6 shadow-soft backdrop-blur"
                                >
                                    <div>
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.42em] text-white/70">
                                            Dilaporkan pada
                                        </p>
                                        <p className="mt-2 text-base font-semibold text-white">
                                            {statusItem.reported_at
                                                ? dateFormatter.format(new Date(statusItem.reported_at))
                                                : 'Belum tersedia'}
                                        </p>
                                    </div>
                                    <StatusBanner
                                        tone="dark"
                                        startLabel="Kepadatan pengunjung"
                                        crowd_level={statusItem.crowd_level}
                                        weather_summary={statusItem.weather_summary}
                                        advisory={statusItem.advisory}
                                        reported_at={statusItem.reported_at}
                                    />
                                </article>
                            ))
                        ) : (
                            <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85 lg:col-span-3">
                                Status lapangan belum tersedia. Tim kami akan memperbarui informasi dalam waktu dekat.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-18%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.16),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Kontak & media sosial</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Saluran resmi pengelola Waduk Manduk</h2>
                            <p className="max-w-2xl text-white/90">
                                Tim Sahabat Manduk siap membantu reservasi, kolaborasi komunitas, permintaan media, hingga pengelolaan kegiatan konservasi warga.
                            </p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {contactChannels.map((channel) => (
                                <div
                                    key={channel.label}
                                    className="rounded-[1.9rem] border border-white/12 bg-white/6 p-6 shadow-soft backdrop-blur"
                                >
                                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/70">
                                        {channel.label}
                                    </p>
                                    {channel.href ? (
                                        <Link
                                            href={channel.href}
                                            className="focus-ring mt-3 inline-flex items-center gap-2 text-lg font-semibold text-white"
                                        >
                                            {channel.value}
                                            <span aria-hidden className="text-sm">→</span>
                                        </Link>
                                    ) : (
                                        <p className="mt-3 text-lg font-semibold text-white">{channel.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="rounded-[1.9rem] border border-white/12 bg-white/5 p-6 shadow-soft backdrop-blur">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/70">Alamat kantor</p>
                            <p className="mt-3 text-lg font-semibold text-white">Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Bahari, Jawa Timur 65123</p>
                            <Link
                                href="https://maps.google.com/?q=Waduk+Manduk"
                                target="_blank"
                                rel="noreferrer"
                                className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-200"
                            >
                                Lihat peta lokasi
                                <span aria-hidden className="text-base">↗</span>
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-6 rounded-[2.2rem] border border-white/15 bg-white/8 p-8 shadow-soft backdrop-blur">
                        <h3 className="text-2xl font-semibold text-white">Kolaborasi & kemitraan</h3>
                        <p className="text-white/85">
                            Kami membuka peluang kerjasama riset, pengembangan produk UMKM, hingga program tanggung jawab sosial perusahaan. Hubungi kami untuk sesi presentasi daring.
                        </p>
                        <Link
                            href="mailto:kolaborasi@wadukmanduk.id"
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                        >
                            Jadwalkan diskusi →
                        </Link>
                        <div className="rounded-[1.8rem] border border-white/12 bg-white/6 p-6">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-white/70">Ikuti kabar terbaru</p>
                            <p className="mt-3 text-sm text-white/85">
                                Instagram · Youtube · Facebook · @wadukmanduk
                            </p>
                            <Link
                                href={route('stories.index')}
                                className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-200"
                            >
                                Baca cerita dan siaran pers →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[linear-gradient(140deg,#f7d08a_0%,#f0b156_35%,#f29a36_70%,#e88a2d_100%)] py-16 text-brand-950 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.38),_rgba(240,173,82,0))]" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
                    <div className="space-y-4">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-900">
                            Kabar terbaru
                        </span>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Ikuti perkembangan Waduk Manduk lebih dekat</h2>
                        <p className="max-w-2xl text-base text-brand-900/80">
                            Dapatkan buletin berkala berisi agenda konservasi, peluang kolaborasi, dan cerita inspiratif dari warga pesisir Manduk.
                        </p>
                    </div>
                    <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-soft backdrop-blur">
                        <p className="text-sm font-semibold text-brand-900">Langganan buletin elektronik</p>
                        <form className="mt-4 space-y-3">
                            <label className="sr-only" htmlFor="newsletter-email">
                                Alamat email
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                placeholder="nama@domain.id"
                                className="focus-ring w-full rounded-[1.2rem] border border-black/10 bg-white/90 px-4 py-3 text-sm text-brand-900"
                            />
                            <button
                                type="submit"
                                className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                            >
                                Daftar sekarang
                            </button>
                        </form>
                        <p className="mt-3 text-xs text-brand-900/70">
                            Kami hanya mengirim email bulanan. Anda dapat berhenti berlangganan kapan saja.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
