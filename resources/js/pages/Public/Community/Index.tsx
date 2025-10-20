import { EventCard } from '@/components/public/cards/event-card';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { StoryCard } from '@/components/public/cards/story-card';
import { PageContainer } from '@/components/public/layout/page-container';
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
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Komunitas Waduk Manduk"
                            subtitle="Gabung reresik waduk, tur edukasi, dan kegiatan warga. Dokumentasikan pengalaman Anda dan kirimkan untuk dikurasi."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-16">
                        <div className="space-y-6 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Agenda Komunitas</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">
                                Jadwalkan aksi dan pelatihan bersama warga
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-foam py-20">
                    <PageContainer className="space-y-10">
                        <div className="space-y-4 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Cerita Relawan & Warga</p>
                            <h2 className="text-3xl font-semibold md:text-4xl max-w-2xl">
                                Jejak aksi komunitas dalam menjaga Waduk Manduk
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
