import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Gallery } from '@/components/public/Gallery';
import { storageUrl } from '@/lib/storage';
import type { EventResource, StoryResource } from '@/types/public';
import { EventCard } from '@/components/public/cards/event-card';
import { StoryCard } from '@/components/public/cards/story-card';

interface GaleriPageProps {
    events: EventResource[];
    stories: StoryResource[];
}

export default function GaleriPage({ events = [], stories = [] }: GaleriPageProps) {
    const galleryItems = [
        ...events
            .filter((event) => Boolean(event.cover_image))
            .map((event) => ({
                src: storageUrl(event.cover_image) ?? '',
                alt: `Dokumentasi acara ${event.title}`,
            })),
        ...stories
            .filter((story) => Boolean(story.hero_image))
            .map((story) => ({
                src: storageUrl(story.hero_image) ?? '',
                alt: `Kegiatan ${story.title}`,
            })),
    ].filter((item) => item.src);

    return (
        <PublicLayout>
            <Head title="Galeri">
                <meta
                    name="description"
                    content="Nikmati album foto Waduk Manduk, dokumentasi event, dan kiriman komunitas dengan lightbox responsif."
                />
                <meta property="og:title" content="Galeri Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Lihat dokumentasi konservasi, UMKM, dan pengalaman pengunjung Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('community.index')} />
            </Head>

            <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container grid gap-8 lg:grid-cols-[1fr,0.9fr]">
                    <div className="space-y-4">
                        <h1 className="text-h1">Galeri Waduk Manduk</h1>
                        <p className="text-text-secondary">
                            Koleksi foto dan dokumentasi kegiatan konservasi, UMKM, serta pengalaman pengunjung. Semua gambar dikurasi dari konten admin dan komunitas.
                        </p>
                        <Link href={route('stories.index')} className="link focus-ring text-sm">
                            Lihat semua artikel & dokumentasi →
                        </Link>
                    </div>
                    <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-6 shadow-soft">
                        <h2 className="text-h3 text-text-primary">Bagikan dokumentasi Anda</h2>
                        <p className="mt-3 text-sm text-text-secondary">
                            Kirim foto atau video terbaik saat berkunjung ke Waduk Manduk. Konten terpilih akan ditampilkan di halaman galeri.
                        </p>
                        <Link href={route('support.index')} className="link focus-ring mt-4 inline-flex text-sm">
                            Kirim dokumentasi komunitas →
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(242,169,54,0.18),transparent_70%)]"
                />
                <div className="container space-y-6">
                    <h2 className="text-h2 text-text-primary">Album foto terbaru</h2>
                    <Gallery items={galleryItems.slice(0, 12)} />
                </div>
            </section>

            <section className="relative overflow-hidden bg-brand-900 py-16 text-on-media lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(66,198,193,0.28),transparent_65%)]"
                />
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,18,41,0.95)_0%,rgba(3,32,72,0.9)_45%,rgba(2,18,41,0.95)_100%)]"
                />
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-on-media">Agenda dengan dokumentasi</h2>
                            <p className="text-on-media-muted">Ikuti agenda yang menyediakan dokumentasi resmi untuk peserta.</p>
                        </div>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-on-media transition hover:text-accent-300"
                        >
                            Semua agenda
                            <span aria-hidden>→</span>
                        </Link>
                    </div>
                    {events.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} tone="dark" />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-on-media-muted">Agenda dengan dokumentasi akan muncul setelah ditambahkan.</p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-surface-1 py-16 lg:py-20">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(42,179,173,0.18),transparent_70%)]"
                />
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Cerita pilihan</h2>
                            <p className="text-text-secondary">Baca kisah di balik foto-foto konservasi dan UMKM di Waduk Manduk.</p>
                        </div>
                        <Link href={route('stories.index')} className="link focus-ring text-sm">
                            Baca cerita lainnya →
                        </Link>
                    </div>
                    {stories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">Cerita akan tampil setelah dipublikasikan.</p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
