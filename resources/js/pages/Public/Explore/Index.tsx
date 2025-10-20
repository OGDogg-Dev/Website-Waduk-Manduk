import { Button } from '@/components/ui/button';
import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
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

export default function ExplorePage({ status, spots, highlights, stories }: ExplorePageProps) {
    return (
        <>
            <Head title="Jelajah & Aktivitas" />
            <PublicLayout
                hero={
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Jelajah & Aktivitas"
                            subtitle="Temukan jalur interpretasi rawa, titian pandang, dan aktivitas edukasi yang ramah keluarga."
                            actions={
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild size="lg" className="rounded-full bg-gold-accent px-8 text-deep-navy hover:bg-gold-accent/90">
                                        <Link href={route('visit.plan')}>Rencanakan kunjungan</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full border-white/20 px-8 text-white hover:bg-white/10"
                                    >
                                        <Link href={route('stories.index', { type: 'gallery' })}>Galeri terbaru</Link>
                                    </Button>
                                </div>
                            }
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-16">
                    <PageContainer className="space-y-10">
                        {status && status.crowd_level && (
                            <div className="rounded-3xl border border-deep-navy/10 bg-foam p-6 text-sm text-deep-navy/70 shadow-reef/10">
                                <span className="font-semibold text-deep-navy">Status lokasi:</span> {status.crowd_level}.{' '}
                                {status.weather_summary}
                            </div>
                        )}

                        <div className="space-y-6 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">
                                Rekomendasi Titian & Viewpoint
                            </p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Panorama terbaik untuk menangkap keajaiban waduk</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {highlights.viewpoints.map((spot) => (
                                <SpotCard key={`view-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-foam py-20">
                    <PageContainer className="space-y-6">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Jalur Interpretasi & Edukasi</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Belajar sambil menjelajah</h2>
                            <p className="max-w-2xl text-sm text-deep-navy/70">
                                Jalur interpretasi rawa dan sesi edukasi flora-fauna cocok untuk kunjungan sekolah maupun komunitas.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {highlights.trails.concat(highlights.education).map((spot) => (
                                <SpotCard key={`trail-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-white py-20">
                    <PageContainer className="space-y-6">
                        <div className="flex flex-col gap-3 text-deep-navy md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Semua Spot</p>
                                <h3 className="text-3xl font-semibold md:text-4xl">Daftar lengkap destinasi Waduk Manduk</h3>
                            </div>
                            <Button asChild variant="outline" className="rounded-full border-deep-navy/15 px-6 text-deep-navy hover:border-gold-accent hover:text-gold-accent">
                                <Link href={route('visit.plan')}>Filter rute</Link>
                            </Button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {spots.map((spot) => (
                                <SpotCard key={`all-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-[#001123] py-20 text-white">
                    <PageContainer className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-3">
                                <p className="text-sm uppercase tracking-[0.4em] text-sky-light">
                                    Cerita & Dokumentasi Lapangan
                                </p>
                                <h3 className="text-3xl font-semibold md:text-4xl">
                                    Dokumentasikan petualangan dan pelajari lebih jauh
                                </h3>
                            </div>
                            <Button asChild variant="ghost" className="rounded-full border border-white/20 px-6 text-white hover:bg-white/10">
                                <Link href={route('stories.index')}>Lihat semua</Link>
                            </Button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}

