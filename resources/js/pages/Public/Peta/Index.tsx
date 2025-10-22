import { Head, Link } from '@inertiajs/react';
import { Map } from '@/components/public/Map';
import { Card } from '@/components/public/Card';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import type { SpotResource, StoryResource, StatusResource } from '@/types/public';

interface PetaPageProps {
    status: StatusResource | null;
    spots: SpotResource[];
    highlights: Record<string, SpotResource[]>;
    stories: StoryResource[];
}

export default function PetaPage({ status, spots = [], highlights = {}, stories = [] }: PetaPageProps) {
    const markers = spots
        .filter((spot) => Boolean(spot.latitude) && Boolean(spot.longitude))
        .map((spot) => ({
            position: [Number(spot.latitude), Number(spot.longitude)] as [number, number],
            title: spot.name,
            description: spot.headline ?? spot.description ?? '',
        }));

    const center: [number, number] = markers.length
        ? markers[0].position
        : ([ -7.843, 112.672 ] as [number, number]);

    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Rencanakan itinerary',
            description: 'Atur waktu kunjungan dan pilih paket fasilitas sesuai jalur yang dipilih.',
        },
        {
            href: route('support.index'),
            title: 'Daftar pendamping lokal',
            description: 'Temukan pemandu konservasi dan relawan yang siap mendampingi perjalanan.',
        },
        {
            href: route('stories.index', { type: 'explore' }),
            title: 'Cerita jelajah',
            description: 'Baca pengalaman pengunjung dan relawan menelusuri setiap jalur Waduk Manduk.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Jelajah & Aktivitas">
                <meta
                    name="description"
                    content="Jelajah Waduk Manduk melalui peta interaktif, status kunjungan, dan sorotan rute konservasi."
                />
                <meta property="og:title" content="Jelajah & Aktivitas Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Gunakan peta interaktif untuk menemukan dermaga, jalur konservasi, dan kisah lapangan Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('explore.index')} />
            </Head>

            <PageHero
                eyebrow="Jelajah & aktivitas"
                title="Jelajah & Aktivitas"
                description="Susuri waduk melalui jalur interpretasi, dermaga, hingga spot konservasi yang terhubung dalam peta interaktif."
                actions={[
                    {
                        label: 'Buka rute Google Maps',
                        href: 'https://maps.google.com/?q=Waduk+Manduk',
                        external: true,
                    },
                ]}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Bantuan rute"
                quickHelpDescription="Siapkan perjalanan dengan panduan jalur dan rekomendasi pendamping."
                quickHelpCta={{
                    label: 'Unduh peta offline',
                    href: '/files/peta-waduk-manduk.pdf',
                    description: 'PDF 2.4 MB',
                }}
            >
                <Breadcrumbs items={[{ label: 'Jelajah & Aktivitas' }]} className="mt-8" />
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(60,138,233,0.24),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Status jalur & cuaca</h2>
                            <p className="text-white/85">
                                Pastikan kondisi jalur aman sebelum berangkat. Status diperbarui langsung oleh pusat kontrol Waduk Manduk.
                            </p>
                        {status ? (
                            <StatusBanner
                                tone="dark"
                                startLabel="Kondisi kunjungan"
                                crowd_level={status.crowd_level}
                                weather_summary={status.weather_summary}
                                temperature={status.temperature}
                                advisory={status.advisory}
                                reported_at={status.reported_at}
                                valid_until={status.valid_until}
                            />
                        ) : (
                            <p className="rounded-[1.6rem] border border-dashed border-white/20 bg-white/5 p-5 text-sm text-white/85">
                                Status lapangan akan tersedia setelah petugas memperbarui laporan terbaru.
                            </p>
                        )}
                    </div>
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur">
                        <h3 className="text-2xl font-semibold text-white">Akses & transportasi</h3>
                        <p className="text-sm text-white/85">
                            Waduk Manduk dapat dijangkau melalui Pelabuhan Bahari (20 menit) atau Terminal Mandala (35 menit). Lanjutkan perjalanan dengan angkutan desa menuju pusat informasi.
                        </p>
                        <Link
                            href="https://maps.google.com/?q=Waduk+Manduk"
                            target="_blank"
                            rel="noreferrer"
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                        >
                            Buka rute di Google Maps →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-6">
                    <Map center={center} markers={markers} className="shadow-soft" />
                    <p className="text-xs text-white/75">Perbesar peta untuk melihat detail jalur. Marker diperbarui otomatis dari panel admin.</p>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#040f24] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(72,150,255,0.2),_rgba(4,15,36,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Sorotan area</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Kategori destinasi utama</h2>
                            <p className="max-w-3xl text-white/90">
                                Telusuri jalur konservasi, spot snorkeling, hingga titik edukasi berdasarkan kategori khusus.
                            </p>
                        </div>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Rencanakan perjalanan →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {Object.entries(highlights).map(([key, items]) => (
                            <article key={key} className="rounded-[2rem] border border-white/12 bg-white/6 p-6 shadow-soft backdrop-blur">
                                <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/75">{key}</p>
                                <ul className="mt-4 space-y-3 text-sm text-white/85">
                                    {items.map((item) => (
                                        <li key={item.id ?? item.slug} className="rounded-[1.5rem] border border-white/12 bg-white/6 p-4">
                                            <p className="font-semibold text-white">{item.name}</p>
                                            <p className="text-xs text-white/75">{item.headline ?? item.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[linear-gradient(150deg,#f7d08a_0%,#f0af5a_35%,#ee9740_70%,#e1842d_100%)] py-16 text-brand-950 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),_rgba(237,160,76,0))]" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-800/80">Cerita jelajah</p>
                            <h2 className="text-3xl font-semibold sm:text-4xl">Liputan lapangan & pengalaman warga</h2>
                            <p className="max-w-3xl text-brand-900/80">
                                Ikuti pengalaman tim konservasi dan warga dalam menjaga jalur jelajah Waduk Manduk.
                            </p>
                        </div>
                        <Link href={route('stories.index')} className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-brand-900">
                            Semua cerita →
                        </Link>
                    </div>
                    {stories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <Card
                                    key={`story-${story.id}`}
                                    image={story.hero_image ?? undefined}
                                    alt={story.title}
                                    title={story.title}
                                    href={route('stories.index', { highlight: story.slug })}
                                    excerpt={story.excerpt}
                                    badge={story.type}
                                    meta={<span className="text-xs text-brand-900/70">{story.published_at}</span>}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-black/20 bg-white/60 p-6 text-sm text-brand-900/80">
                            Cerita akan tampil setelah dipublikasikan oleh admin.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
