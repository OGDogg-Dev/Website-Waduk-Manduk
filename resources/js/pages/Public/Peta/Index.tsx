import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Map } from '@/components/public/Map';
import { Card } from '@/components/public/Card';
import type { SpotResource, StoryResource, StatusResource } from '@/types/public';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';

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

    return (
        <PublicLayout>
            <Head title="Peta Interaktif">
                <meta
                    name="description"
                    content="Jelajahi peta interaktif Waduk Manduk dengan marker lokasi utama, rute akses, dan sorotan konservasi."
                />
                <meta property="og:title" content="Peta Interaktif Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Gunakan peta Leaflet untuk menemukan dermaga, jalur konservasi, dan cerita terbaru Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('explore.index')} />
            </Head>

            <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container grid gap-8 lg:grid-cols-[1fr,0.9fr]">
                    <div className="space-y-4">
                        <h1 className="text-h1">Peta Interaktif Waduk Manduk</h1>
                        <p className="text-text-secondary">
                            Gunakan peta ini untuk menemukan dermaga, jalur konservasi, titik snorkeling, dan kios UMKM terkurasi. Semua marker diperbarui berdasarkan data admin.
                        </p>
                        {status && (
                            <div className="rounded-3xl border border-surface-3/70 bg-surface-1 p-6 shadow-soft">
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status cuaca & kunjungan"
                                />
                            </div>
                        )}
                    </div>
                    <div className="space-y-4 rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                        <h2 className="text-h3 text-text-primary">Rute ke lokasi</h2>
                        <p className="text-sm text-text-secondary">
                            Waduk Manduk dapat diakses melalui pelabuhan Bahari (20 menit) atau Terminal Mandala (35 menit). Gunakan transportasi umum menuju Desa Manduk dan lanjutkan dengan angkutan desa.
                        </p>
                        <Link href="https://maps.google.com" target="_blank" rel="noreferrer" className="link focus-ring text-sm">
                            Lihat di Google Maps →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(42,179,173,0.18),transparent_70%)]"
                />
                <div className="container">
                    <Map center={center} markers={markers} className="shadow-soft" />
                    <p className="mt-3 text-xs text-text-muted">
                        Perbesar peta untuk melihat detail jalur. Marker diperbarui otomatis dari admin.
                    </p>
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(242,169,54,0.18),transparent_70%)]"
                />
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Sorotan area konservasi</h2>
                            <p className="text-text-secondary">Destinasi utama berdasarkan kategori peruntukan.</p>
                        </div>
                        <Link href={route('visit.plan')} className="link focus-ring text-sm">
                            Rencanakan kunjungan →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {Object.entries(highlights).map(([key, items]) => (
                            <article key={key} className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                                <p className="eyebrow text-xs text-brand-600">{key}</p>
                                <ul className="mt-4 space-y-3 text-sm text-text-secondary">
                                    {items.map((item) => (
                                        <li key={item.id ?? item.slug} className="rounded-2xl border border-surface-2 bg-surface-1 p-4">
                                            <p className="font-semibold text-text-primary">{item.name}</p>
                                            <p className="text-xs text-text-muted">{item.headline ?? item.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(66,198,193,0.18),transparent_70%)]"
                />
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Cerita lapangan</h2>
                            <p className="text-text-secondary">Liputan terbaru tentang konservasi dan kegiatan warga di sekitar waduk.</p>
                        </div>
                        <Link href={route('stories.index')} className="link focus-ring text-sm">
                            Semua berita →
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
                                    meta={<span className="text-xs text-text-muted">{story.published_at}</span>}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">Cerita akan tampil setelah diterbitkan oleh admin.</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
