import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StatusResource } from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface AboutPageProps {
    metrics: {
        spots: number;
        umkm: number;
        events: number;
        stories: number;
    };
    latestStatus: Array<Pick<StatusResource, 'crowd_level' | 'weather_summary' | 'reported_at' | 'advisory'>>;
}

const heroImage = 'https://images.unsplash.com/photo-1521207418485-99c705420785?auto=format&fit=crop&w=1600&q=80';

export default function AboutPage({ metrics, latestStatus }: AboutPageProps) {
    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Informasi kunjungan',
            description: 'Jam operasional, titik kumpul tur, dan aksesibilitas kursi roda.',
        },
        {
            href: 'mailto:halo@wadukmanduk.id',
            title: 'Email pengelola',
            description: 'Kirim pertanyaan atau media request ke tim Sahabat Manduk.',
        },
        {
            href: route('support.index'),
            title: 'Dukung konservasi',
            description: 'Lihat skema donasi, kemitraan CSR, dan program relawan.',
        },
    ];

    const metricItems = [
        { label: 'Spot terkelola', value: metrics.spots },
        { label: 'UMKM mitra', value: metrics.umkm },
        { label: 'Event komunitas', value: metrics.events },
        { label: 'Cerita diterbitkan', value: metrics.stories },
    ];

    return (
        <>
            <Head title="Tentang & Kontak" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Tim pengelola Waduk Manduk memantau kawasan"
                        eyebrow="Tentang Kami"
                        title="Inisiatif kolaboratif warga Waduk Manduk"
                        subtitle="Ekowisata ini dikelola oleh komunitas Sahabat Manduk bersama pemerintah desa untuk memastikan wisata berjalan selaras dengan konservasi."
                        actions={[
                            { label: 'Hubungi tim pengelola', href: 'mailto:halo@wadukmanduk.id' },
                            { label: 'Lihat struktur komunitas', href: route('community.index'), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Misi pengelolaan</h2>
                                    <p className="mt-4 text-text-secondary">
                                        Waduk Manduk adalah ruang belajar terbuka bagi warga, peneliti, dan wisatawan. Kami menjaga ekosistem
                                        perairan sekaligus membuka peluang ekonomi bagi UMKM pesisir.
                                    </p>
                                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                        {metricItems.map((item) => (
                                            <div
                                                key={item.label}
                                                className="rounded-2xl border border-surface-3/70 bg-surface-1 p-6 text-center shadow-soft"
                                            >
                                                <p className="text-3xl font-semibold text-brand-600">{item.value}</p>
                                                <p className="mt-2 text-sm text-text-secondary">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Tim inti & relawan</h3>
                                    <p className="mt-3 text-text-secondary">
                                        Komunitas Sahabat Manduk terdiri dari warga desa, nelayan, pegiat konservasi, dan fasilitator wisata. Kami
                                        membangun protokol keselamatan, edukasi, dan program ekonomi lokal secara partisipatif.
                                    </p>
                                    <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                                        <li>• 36 relawan tetap memonitor kualitas air dan keamanan jalur wisata.</li>
                                        <li>• 22 pelaku UMKM mendapat pendampingan kemasan dan pemasaran.</li>
                                        <li>• 12 sekolah mitra mengikuti kurikulum literasi bahari sepanjang tahun.</li>
                                    </ul>
                                    <Link href={route('community.index')} className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                        Pelajari program komunitas →
                                    </Link>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Kontak cepat"
                                description="Temukan jalur komunikasi resmi pengelola Waduk Manduk."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Kontak cepat"
                            description="Temukan jalur komunikasi resmi pengelola Waduk Manduk."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                {latestStatus.length > 0 && (
                    <section className="bg-surface-1 py-12 lg:py-16">
                        <div className="container space-y-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Status lapangan</p>
                                <h2 className="text-h2 text-text-primary">Update situasi terkini</h2>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {latestStatus.map((statusItem, index) => (
                                    <StatusBanner
                                        key={`status-${index}`}
                                        crowd_level={statusItem.crowd_level}
                                        weather_summary={statusItem.weather_summary}
                                        advisory={statusItem.advisory}
                                        startLabel={
                                            statusItem.reported_at
                                                ? `Dilaporkan ${new Date(statusItem.reported_at).toLocaleDateString('id-ID')}`
                                                : 'Dilaporkan'
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="py-12 lg:py-16">
                    <div className="container grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
                        <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                            <h3 className="text-h3 text-text-primary">Alamat & jam layanan</h3>
                            <div className="mt-4 space-y-3 text-sm text-text-secondary">
                                <p>Jl. Danau Biru No. 88, Desa Manduk, Kabupaten Gresik, Jawa Timur.</p>
                                <p>Jam operasional loket: 07.00 – 16.00 WIB (setiap hari).</p>
                                <p>Whatsapp Center: 0813-1122-3344 | Email: halo@wadukmanduk.id</p>
                            </div>
                            <Link href="https://maps.google.com" className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                Buka lokasi di Maps →
                            </Link>
                        </div>
                        <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                            <h3 className="text-h3 text-text-primary">Permintaan media & riset</h3>
                            <p className="mt-3 text-text-secondary">
                                Tim kami menyiapkan paket informasi, data lingkungan, dan pengantar narasumber untuk peneliti maupun media.
                                Kirimkan detail kebutuhan Anda minimal 5 hari kerja sebelum kunjungan.
                            </p>
                            <Link href="mailto:media@wadukmanduk.id" className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                Kirim permohonan media →
                            </Link>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
