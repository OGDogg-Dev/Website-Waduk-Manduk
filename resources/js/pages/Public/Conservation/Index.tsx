import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { EventCard } from '@/components/public/cards/event-card';
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
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Konservasi & Edukasi"
                            subtitle="Belajar langsung dari lapangan tentang flora-fauna khas Waduk Manduk, ikuti program edukasi dan konservasi."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-10">
                        <div className="space-y-4 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Spot Edukasi Unggulan</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">
                                Lokasi pembelajaran ekosistem di Waduk Manduk
                            </h2>
                            <p className="max-w-2xl text-sm text-deep-navy/70">
                                Jelajahi titik edukasi yang menyajikan interpretasi flora-fauna, laboratorium lapangan, hingga stasiun monitoring kualitas air.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {educationSpots.map((spot) => (
                                <SpotCard key={spot.id} {...spot} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-foam py-20">
                    <PageContainer className="space-y-10">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Program Konservasi Terdekat</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Ikut terjun menjaga ekosistem air</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {programs.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-white py-20">
                    <PageContainer className="space-y-10">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Cerita Konservasi</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Catatan lapangan dari relawan dan peneliti</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {conservationStories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
