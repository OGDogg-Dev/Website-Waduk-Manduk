import { Hero } from '@/components/public/hero';
import { SpotCard } from '@/components/public/spot-card';
import { StoryCard } from '@/components/public/story-card';
import { EventCard } from '@/components/public/event-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, SpotResource, StoryResource } from '@/types/public';
import { Head } from '@inertiajs/react';

interface ConservationPageProps {
    educationSpots: SpotResource[];
    conservationStories: StoryResource[];
    programs: EventResource[];
}

export default function ConservationPage({ educationSpots, conservationStories, programs }: ConservationPageProps) {
    return (
        <>
            <Head title="Konservasi & Edukasi" />
            <PublicLayout
                hero={
                    <Hero
                        title="Konservasi & Edukasi"
                        subtitle="Belajar langsung dari lapangan tentang flora-fauna khas Waduk Manduk, ikuti program edukasi dan konservasi."
                    />
                }
            >
                <div className="space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Spot Edukasi Unggulan
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {educationSpots.map((spot) => (
                                <SpotCard key={spot.id} {...spot} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Program Konservasi Terdekat
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {programs.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                Cerita Konservasi
                            </h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {conservationStories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}
