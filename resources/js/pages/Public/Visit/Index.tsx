import { EventCard } from '@/components/public/event-card';
import { Hero } from '@/components/public/hero';
import { SpotCard } from '@/components/public/spot-card';
import { StatusBanner } from '@/components/public/status-banner';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, SpotResource, StatusResource } from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface VisitPageProps {
    status: StatusResource | null;
    spots: SpotResource[];
    groupedSpots: Record<string, SpotResource[]>;
    upcomingEvents: EventResource[];
    visitTips: string[];
}

const typeLabels: Record<string, string> = {
    entrance: 'Pintu Masuk',
    trail: 'Jalur Interpretasi',
    viewpoint: 'Titik Pandang',
    facility: 'Fasilitas Umum',
    education: 'Edukasi',
};

export default function VisitPage({
    status,
    spots,
    groupedSpots,
    upcomingEvents,
    visitTips,
}: VisitPageProps) {
    return (
        <>
            <Head title="Rencanakan Kunjungan" />
            <PublicLayout
                hero={
                    <Hero
                        title="Rencanakan Kunjungan Anda ke Waduk Manduk"
                        subtitle="Cek status lokasi, temukan jalur terbaik, dan persiapkan kebutuhan sebelum berangkat."
                        actions={
                            <>
                                <Button asChild size="lg">
                                    <Link href={route('explore.index')}>Lihat peta spot</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href={route('support.index')}>Dukung konservasi</Link>
                                </Button>
                            </>
                        }
                    />
                }
            >
                <div className="space-y-12">
                    {status && (
                        <StatusBanner
                            crowd_level={status.crowd_level}
                            weather_summary={status.weather_summary}
                            temperature={status.temperature}
                            advisory={status.advisory}
                            startLabel="Status terbaru"
                        />
                    )}

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Denah Spot & Jalur
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Spot dikelompokkan berdasarkan kategori agar memudahkan perencanaan rute.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {spots.map((spot) => (
                                <SpotCard key={spot.id} {...spot} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            Rekomendasi Jalur Berdasarkan Kategori
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(groupedSpots).map(([type, items]) => (
                                <details
                                    key={type}
                                    className="overflow-hidden rounded-xl border border-border/70 bg-muted/20"
                                >
                                    <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground">
                                        {typeLabels[type] ?? type}
                                    </summary>
                                    <div className="px-4 pb-4">
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {items.map((item) => (
                                                <li key={item.id} className="rounded-lg border border-border/60 p-3">
                                                    <p className="font-medium text-foreground">{item.name}</p>
                                                    {item.headline && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {item.headline}
                                                        </p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            Agenda Terdekat
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">
                            Tips Persiapan
                        </h3>
                        <ul className="grid gap-3 rounded-2xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground md:grid-cols-2">
                            {visitTips.map((tip, index) => (
                                <li key={`${tip}-${index}`} className="leading-relaxed">
                                    • {tip}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}

