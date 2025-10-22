import { PageContainer } from '@/components/public/layout/page-container';
import { EventCard } from '@/components/public/cards/event-card';
import type { EventResource } from '@/types/public';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface EventsSectionProps {
    upcomingEvents: EventResource[];
}

export function EventsSection({ upcomingEvents }: EventsSectionProps) {
    return (
        <section className="bg-[#001b3b] py-20 text-white">
            <PageContainer className="space-y-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl space-y-4">
                        <p className="text-sm uppercase tracking-[0.4em] text-sky-light">Event & Agenda</p>
                        <h2 className="text-3xl font-semibold text-on-media md:text-4xl">
                            Ikuti agenda konservasi, budaya, dan olahraga air
                        </h2>
                        <p className="text-sm leading-relaxed text-on-media-muted">
                            Tim kami merancang aktivitas sepanjang tahun untuk menjaga ekosistem dan mempererat jejaring komunitas bahari.
                        </p>
                    </div>
                    <Button
                        asChild
                        className="rounded-full bg-gold-accent px-6 text-deep-navy hover:bg-gold-accent/90"
                    >
                        <Link href={route('community.index')}>Gabung komunitas</Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {upcomingEvents.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}
