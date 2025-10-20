import { EventCard } from '@/components/public/event-card';
import { Hero } from '@/components/public/hero';
import { StoryCard } from '@/components/public/story-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, StoryResource } from '@/types/public';
import { Head } from '@inertiajs/react';

interface CommunityPageProps {
    events: EventResource[];
    stories: StoryResource[];
}

export default function CommunityPage({ events, stories }: CommunityPageProps) {
    return (
        <>
            <Head title="Komunitas" />
            <PublicLayout
                hero={
                    <Hero
                        title="Komunitas Waduk Manduk"
                        subtitle="Gabung reresik waduk, tur edukasi, dan kegiatan warga. Dokumentasikan pengalaman Anda dan kirimkan untuk dikurasi."
                    />
                }
            >
                <div className="space-y-12">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Agenda Komunitas
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Cerita Relawan & Warga
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}
