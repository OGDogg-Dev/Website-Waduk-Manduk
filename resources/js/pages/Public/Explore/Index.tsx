import { Button } from '@/components/ui/button';
import { Hero } from '@/components/public/hero';
import { SpotCard } from '@/components/public/spot-card';
import { StoryCard } from '@/components/public/story-card';
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
                    <Hero
                        title="Jelajah & Aktivitas"
                        subtitle="Temukan jalur interpretasi rawa, titian pandang, dan aktivitas edukasi yang ramah keluarga."
                        actions={
                            <>
                                <Button asChild size="lg">
                                    <Link href={route('visit.plan')}>Rencanakan kunjungan</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href={route('stories.index', { type: 'gallery' })}>
                                        Galeri terbaru
                                    </Link>
                                </Button>
                            </>
                        }
                    />
                }
            >
                <div className="space-y-12">
                    {status && status.crowd_level && (
                        <div className="rounded-2xl border border-border bg-muted/20 p-5 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Status lokasi:</span>{' '}
                            {status.crowd_level}. {status.weather_summary}
                        </div>
                    )}

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Rekomendasi Titian & Viewpoint
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {highlights.viewpoints.map((spot) => (
                                <SpotCard key={`view-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Jalur Interpretasi & Edukasi
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Jalur interpretasi rawa dan sesi edukasi flora-fauna cocok untuk kunjungan sekolah maupun komunitas.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {highlights.trails.concat(highlights.education).map((spot) => (
                                <SpotCard key={`trail-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            Semua Spot
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {spots.map((spot) => (
                                <SpotCard key={`all-${spot.id}`} {...spot} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">
                                Cerita & Dokumentasi Lapangan
                            </h3>
                            <Button asChild variant="ghost" size="sm">
                                <Link href={route('stories.index')}>Lihat semua</Link>
                            </Button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}

