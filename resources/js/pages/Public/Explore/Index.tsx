import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { SpotResource, StoryResource, StatusResource } from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface ExplorePageProps {
    status: StatusResource | null;
    spots: SpotResource[];
    highlights: {
        viewpoints: SpotResource[];
        trails: SpotResource[];
        education: SpotResource[];
    };
    stories: StoryResource[];
}

const heroImage = 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80';

export default function ExplorePage({ status, spots, highlights, stories }: ExplorePageProps) {
    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Rencanakan kunjungan',
            description: 'Cek kapasitas harian, paket tur, dan rekomendasi waktu terbaik.',
        },
        {
            href: route('stories.index', { type: 'gallery' }),
            title: 'Galeri pengalaman',
            description: 'Lihat dokumentasi terbaru dari pengunjung dan tim lapangan.',
        },
        {
            href: route('support.index'),
            title: 'Sewa pemandu & peralatan',
            description: 'Ajukan pemandu snorkeling, paddle board, atau fotografer lapangan.',
        },
    ];

    return (
        <>
            <Head title="Jelajah & Aktivitas" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Wisatawan menikmati pemandangan Waduk Manduk"
                        eyebrow="Jelajah & Aktivitas"
                        title="Panorama, jalur interpretasi, dan aktivitas edukatif"
                        subtitle="Temukan titian pandang, jelajah rawa, hingga sesi edukasi biodiversitas yang ramah keluarga."
                        actions={[
                            { label: 'Rencanakan kunjungan', href: route('visit.plan') },
                            { label: 'Galeri terbaru', href: route('stories.index', { type: 'gallery' }), variant: 'ghost' },
                        ]}
                    >
                        {status && (
                            <div className="max-w-xl">
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status kunjungan"
                                    tone="dark"
                                />
                            </div>
                        )}
                    </Hero>
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Rekomendasi panorama & viewpoint</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Titik terbaik untuk menikmati sunrise, sunset, dan lanskap waduk. Pastikan reservasi pemandu untuk sesi foto profesional.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {highlights.viewpoints.map((spot) => (
                                            <SpotCard key={`view-${spot.id}`} {...spot} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Jalur interpretasi & edukasi</h3>
                                    <p className="mt-3 text-text-secondary">
                                        Jelajah rawa, menara observasi, serta pos edukasi biodiversitas yang dipandu fasilitator komunitas.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {highlights.trails.concat(highlights.education).map((spot) => (
                                            <SpotCard key={`trail-${spot.id}`} {...spot} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Bantuan jelajah"
                                description="Panduan cepat untuk pengalaman terbaik."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan jelajah"
                            description="Panduan cepat untuk pengalaman terbaik."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Semua destinasi</p>
                                <h2 className="text-h2 text-text-primary">Daftar lengkap spot Waduk Manduk</h2>
                            </div>
                            <Link href={route('visit.plan')} className="link focus-ring">
                                Filter rute & paket →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {spots.map((spot) => (
                                <SpotCard key={`all-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                                    Cerita petualangan
                                </p>
                                <h2 className="text-h2 text-text-primary">Dokumentasikan perjalanan dan pelajari lebih jauh</h2>
                            </div>
                            <Link href={route('stories.index', { type: 'gallery' })} className="link focus-ring">
                                Lihat semua dokumentasi →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
