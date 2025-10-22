import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import type { EventResource, SiteStatusResource, SpotResource } from '@/types/public';
import { EventCard } from '@/components/public/cards/event-card';

interface FasilitasPageProps {
    status: SiteStatusResource | null;
    spots: SpotResource[];
    visitTips: string[];
    upcomingEvents: EventResource[];
}

const facilityHighlights = [
    {
        title: 'Dermaga Apung & Perahu Wisata',
        description: 'Termasuk jaket pelampung dan pemandu konservasi selama 45 menit pelayaran.',
        price: 'Rp85.000 / orang',
    },
    {
        title: 'Pusat Edukasi Mangrove',
        description: 'Tur interpretasi dengan toolkit pengamatan kualitas air dan bibit mangrove.',
        price: 'Rp55.000 / orang',
    },
];

export default function FasilitasPage({ status, spots = [], visitTips = [], upcomingEvents = [] }: FasilitasPageProps) {
    return (
        <PublicLayout>
            <Head title="Fasilitas & Harga">
                <meta
                    name="description"
                    content="Lihat fasilitas, layanan, dan tarif resmi Waduk Manduk lengkap dengan tips kunjungan dan agenda edukasi."
                />
                <meta property="og:title" content="Fasilitas & Harga Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Telusuri paket wisata edukasi, fasilitas keluarga, dan dukungan konservasi Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('visit.plan')} />
            </Head>

            <section className="py-12 lg:py-16">
                <div className="container grid gap-8 lg:grid-cols-[1fr,0.9fr]">
                    <div className="space-y-4">
                        <h1 className="text-h1">Fasilitas &amp; Harga Waduk Manduk</h1>
                        <p className="text-text-secondary">
                            Pilihan paket wisata edukasi, fasilitas ramah keluarga, dan layanan konservasi tersedia sesuai kapasitas harian. Semua tarif mendukung pemeliharaan ekosistem.
                        </p>
                        {status && (
                            <div className="rounded-3xl border border-surface-3/70 bg-surface-1 p-6 shadow-soft">
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status kunjungan"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-4 rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                        <h2 className="text-h3 text-text-primary">Tips sebelum berkunjung</h2>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            {visitTips.map((tip) => (
                                <li key={tip} className="rounded-2xl border border-surface-2 bg-surface-1 p-4">
                                    {tip}
                                </li>
                            ))}
                        </ul>
                        <Link href={route('visit.plan')} className="link focus-ring text-sm">
                            Ajukan reservasi kelompok →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-surface-1 py-12 lg:py-16">
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Daftar fasilitas dan layanan</h2>
                            <p className="text-text-secondary">
                                Informasi harga dapat berubah mengikuti kebijakan konservasi. Hubungi petugas untuk paket khusus.
                            </p>
                        </div>
                        <Link href={route('support.index')} className="link focus-ring text-sm">
                            Cek program konservasi →
                        </Link>
                    </div>
                    {spots.length ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] table-auto border-separate border-spacing-y-2 text-sm text-text-secondary">
                                <thead>
                                    <tr className="bg-surface-0 text-left text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
                                        <th className="rounded-l-2xl px-4 py-3">Fasilitas</th>
                                        <th className="px-4 py-3">Kategori</th>
                                        <th className="px-4 py-3">Deskripsi</th>
                                        <th className="rounded-r-2xl px-4 py-3">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {spots.map((spot, index) => (
                                        <tr
                                            key={spot.id ?? `${spot.name}-${index}`}
                                            className="rounded-2xl border border-surface-3/60 bg-surface-0 shadow-soft transition hover:border-brand-200"
                                        >
                                            <td className="rounded-l-2xl px-4 py-4 text-text-primary">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-sm font-semibold">{spot.name}</span>
                                                    {spot.headline && <span className="text-xs text-text-muted">{spot.headline}</span>}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="chip bg-accent-500/10 text-xs font-semibold uppercase tracking-[0.28em] text-accent-600">
                                                    {spot.type ?? 'Fasilitas'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-text-secondary">
                                                {spot.description ?? 'Detail fasilitas akan diperbarui melalui admin.'}
                                            </td>
                                            <td className="rounded-r-2xl px-4 py-4 text-text-primary">
                                                {spot.category ?? 'Hubungi petugas'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="rounded-3xl border border-dashed border-surface-3/70 bg-surface-0 p-6 text-sm text-text-secondary">
                            Data fasilitas belum tersedia. Tambahkan informasi melalui panel admin untuk menampilkannya di halaman ini.
                        </p>
                    )}
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container grid gap-6 lg:grid-cols-3">
                    {facilityHighlights.map((item) => (
                        <article key={item.title} className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                            <p className="eyebrow text-xs text-brand-600">Paket populer</p>
                            <h3 className="mt-2 text-h4 text-text-primary">{item.title}</h3>
                            <p className="mt-3 text-sm text-text-secondary">{item.description}</p>
                            <p className="mt-4 text-sm font-semibold text-brand-600">{item.price}</p>
                        </article>
                    ))}
                    <article className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                        <p className="eyebrow text-xs text-brand-600">Butuh penyesuaian?</p>
                        <h3 className="mt-2 text-h4 text-text-primary">Reservasi rombongan & sekolah</h3>
                        <p className="mt-3 text-sm text-text-secondary">
                            Kami menyiapkan paket edukasi konservasi untuk sekolah dan komunitas profesional dengan jadwal fleksibel.
                        </p>
                        <Link href={route('visit.plan')} className="link focus-ring mt-4 inline-flex text-sm">
                            Hubungi tim reservasi →
                        </Link>
                    </article>
                </div>
            </section>

            <section className="bg-surface-1 py-12 lg:py-16">
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Agenda edukasi & konservasi</h2>
                            <p className="text-text-secondary">Ikuti kegiatan terbaru yang relevan dengan rencana kunjungan Anda.</p>
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
                            Agenda akan muncul otomatis setelah ditambahkan melalui panel admin.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
