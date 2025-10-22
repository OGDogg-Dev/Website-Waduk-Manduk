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

            <section className="py-12 lg:py-16">
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

            <section className="bg-surface-1 py-12 lg:py-16">
                <div className="container space-y-6">
                    <h2 className="text-h2 text-text-primary">Album foto terbaru</h2>
                    <Gallery items={galleryItems.slice(0, 12)} />
                </div>
            </section>

            <section className="py-12 lg:py-16">
                <div className="container space-y-6">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h2 className="text-h2 text-text-primary">Agenda dengan dokumentasi</h2>
                            <p className="text-text-secondary">Ikuti agenda yang menyediakan dokumentasi resmi untuk peserta.</p>
                        </div>
                        <Link href={route('visit.plan')} className="link focus-ring text-sm">
                            Semua agenda →
                        </Link>
                    </div>
                    {events.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-text-secondary">Agenda dengan dokumentasi akan muncul setelah ditambahkan.</p>
                    )}
                </div>
            </section>

            <section className="bg-surface-1 py-12 lg:py-16">
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
