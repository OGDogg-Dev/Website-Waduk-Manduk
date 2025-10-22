import { Head, Link } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { EventCard } from '@/components/public/cards/event-card';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, SpotResource, StatusResource } from '@/types/public';

interface FasilitasPageProps {
    status: StatusResource | null;
    spots: SpotResource[];
    groupedSpots: Record<string, SpotResource[]>;
    visitTips: string[];
    upcomingEvents: EventResource[];
}

const defaultHighlights = [
    {
        title: 'Dermaga & tur interpretasi',
        description: '45 menit pelayaran dengan pemandu konservasi, rompi pelampung, dan dokumentasi digital.',
    },
    {
        title: 'Laboratorium hidup mangrove',
        description: 'Eksperimen sederhana mengenai kualitas air, keanekaragaman hayati, dan mitigasi abrasi.',
    },
    {
        title: 'Kelas UMKM pesisir',
        description: 'Workshop kuliner laut berkelanjutan dan kriya berbahan baku alami bersama UMKM mitra.',
    },
];

export default function FasilitasPage({ status, groupedSpots, visitTips = [], upcomingEvents = [] }: FasilitasPageProps) {
    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Ajukan reservasi kelompok',
            description: 'Konsultasikan jadwal kunjungan rombongan sekolah, komunitas, atau korporasi.',
        },
        {
            href: route('explore.index'),
            title: 'Lihat peta destinasi',
            description: 'Telusuri jalur interpretasi, dermaga, dan fasilitas pendukung sebelum berangkat.',
        },
        {
            href: route('qris.index'),
            title: 'Panduan pembayaran',
            description: 'Unduh panduan QRIS dan daftar metode pembayaran resmi Waduk Manduk.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Rencanakan Kunjungan">
                <meta
                    name="description"
                    content="Rancang perjalanan ke Waduk Manduk dengan panduan reservasi, status kunjungan, dan fasilitas lengkap."
                />
                <meta property="og:title" content="Rencanakan Kunjungan Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Lihat status terkini, paket fasilitas, dan agenda konservasi untuk mempersiapkan kunjungan Anda."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('visit.plan')} />
            </Head>

            <PageHero
                eyebrow="Perencanaan kunjungan"
                title="Rencanakan Kunjungan Anda"
                description="Siapkan pengalaman jelajah Waduk Manduk dengan memantau status terbaru, memilih paket fasilitas, dan mengatur agenda konservasi."
                actions={[
                    {
                        label: 'Hubungi tim reservasi',
                        href: 'mailto:reservasi@wadukmanduk.id',
                    },
                ]}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Langkah penting"
                quickHelpDescription="Mulai dari reservasi, cek rute, hingga panduan pembayaran nontunai."
                quickHelpCta={{
                    label: 'Hubungi tim reservasi',
                    href: 'mailto:reservasi@wadukmanduk.id',
                    description: 'reservasi@wadukmanduk.id',
                }}
            >
                <Breadcrumbs items={[{ label: 'Rencanakan Kunjungan' }]} className="mt-8" />
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(60,138,233,0.24),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/8 p-8 shadow-soft backdrop-blur">
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Status kunjungan terkini</h2>
                        <p className="text-white/85">
                            Pantau kepadatan pengunjung, cuaca, dan imbauan keselamatan sebelum melakukan perjalanan.
                        </p>
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
                            <p className="rounded-[1.6rem] border border-dashed border-white/20 bg-white/5 p-5 text-sm text-white/85">
                                Status lapangan belum tersedia. Data akan diperbarui secara berkala oleh petugas.
                            </p>
                        )}
                    </div>
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur">
                        <h3 className="text-2xl font-semibold text-white">Tips sebelum berkunjung</h3>
                        <ul className="space-y-3 text-sm text-white/85">
                            {visitTips.map((tip) => (
                                <li key={tip} className="rounded-[1.5rem] border border-white/15 bg-white/6 p-4">
                                    {tip}
                                </li>
                            ))}
                        </ul>
                        <Link
                            href={route('support.index')}
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                        >
                            Tanya tim layanan →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Direktori fasilitas</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Paket pengalaman & fasilitas</h2>
                        <p className="max-w-3xl text-white/90">
                            Pilih paket sesuai kebutuhan rombongan. Semua fasilitas mendukung edukasi dan konservasi berkelanjutan.
                        </p>
                    </div>
                    <div className="grid gap-8">
                        {Object.entries(groupedSpots).length ? (
                            Object.entries(groupedSpots).map(([category, items]) => (
                                <div key={category} className="space-y-5 rounded-[2rem] border border-white/12 bg-white/6 p-6 shadow-soft backdrop-blur">
                                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white">{category}</h3>
                                            <p className="text-sm text-white/80">
                                                Rincian paket dan fasilitas dalam kategori {category.toLowerCase()}.
                                            </p>
                                        </div>
                                        <Link
                                            href={route('explore.index')}
                                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white/35 hover:bg-white/10"
                                        >
                                            Lihat peta lokasi →
                                        </Link>
                                    </div>
                                    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                                        {items.map((spot) => (
                                            <article key={spot.id ?? `${spot.name}-${spot.type}`} className="rounded-[1.8rem] border border-white/12 bg-white/4 p-5">
                                                <p className="text-sm font-semibold text-white">{spot.name}</p>
                                                {spot.description && <p className="mt-2 text-sm text-white/80">{spot.description}</p>}
                                                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-white/70">
                                                    {spot.category ?? 'Hubungi petugas'}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                                Data fasilitas belum tersedia. Tambahkan paket melalui panel admin untuk menampilkannya di halaman ini.
                            </p>
                        )}
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {defaultHighlights.map((highlight) => (
                            <div key={highlight.title} className="rounded-[1.8rem] border border-white/12 bg-white/6 p-6 text-sm text-white/85">
                                <p className="text-base font-semibold text-white">{highlight.title}</p>
                                <p className="mt-3">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#040f24] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(72,150,255,0.2),_rgba(4,15,36,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Agenda konservasi</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Sesuaikan jadwal dengan program edukasi</h2>
                            <p className="max-w-3xl text-white/90">
                                Ikuti kegiatan yang mendukung rencana perjalanan Anda agar pengalaman lebih bermakna.
                            </p>
                        </div>
                        <Link
                            href={route('support.index', { type: 'volunteer' })}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Semua agenda →
                        </Link>
                    </div>
                    {upcomingEvents.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Agenda akan tampil otomatis setelah ditambahkan oleh admin.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[linear-gradient(150deg,#f7d08a_0%,#f0af5a_35%,#ee9740_70%,#e1842d_100%)] py-16 text-brand-950 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),_rgba(237,160,76,0))]" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                    <div className="space-y-4">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-900">
                            Konsultasi perjalanan
                        </span>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Butuh bantuan menyusun itinerary?</h2>
                        <p className="max-w-2xl text-base text-brand-900/80">
                            Tim Sahabat Manduk siap membantu menyusun pengalaman jelajah dan konservasi sesuai kebutuhan rombongan Anda.
                        </p>
                    </div>
                    <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-soft backdrop-blur">
                        <p className="text-sm font-semibold text-brand-900">Ajukan konsultasi cepat</p>
                        <form className="mt-4 space-y-3">
                            <label className="sr-only" htmlFor="plan-email">
                                Email
                            </label>
                            <input
                                id="plan-email"
                                type="email"
                                placeholder="nama@organisasi.id"
                                className="focus-ring w-full rounded-[1.2rem] border border-black/15 bg-white px-4 py-3 text-sm text-brand-900"
                            />
                            <label className="sr-only" htmlFor="plan-notes">
                                Catatan
                            </label>
                            <textarea
                                id="plan-notes"
                                placeholder="Tulis kebutuhan rombongan atau jadwal kunjungan."
                                className="focus-ring h-28 w-full rounded-[1.2rem] border border-black/15 bg-white px-4 py-3 text-sm text-brand-900"
                            />
                            <button
                                type="submit"
                                className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                            >
                                Kirim permintaan
                            </button>
                        </form>
                        <p className="mt-3 text-xs text-brand-900/70">
                            Kami akan merespons dalam 1x24 jam kerja melalui email.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
