import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
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
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Rencanakan Kunjungan Anda ke Waduk Manduk"
                            subtitle="Cek status lokasi, temukan jalur terbaik, dan persiapkan kebutuhan sebelum berangkat."
                            actions={
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild size="lg" className="rounded-full bg-gold-accent px-8 text-deep-navy hover:bg-gold-accent/90">
                                        <Link href={route('explore.index')}>Lihat peta spot</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full border-white/20 px-8 text-white hover:bg-white/10"
                                    >
                                        <Link href={route('support.index')}>Dukung konservasi</Link>
                                    </Button>
                                </div>
                            }
                        />
                    </PageContainer>
                }
            >
                <section className="bg-[#00152d] py-16 text-white">
                    <PageContainer className="space-y-10">
                        {status && (
                            <StatusBanner
                                crowd_level={status.crowd_level}
                                weather_summary={status.weather_summary}
                                temperature={status.temperature}
                                advisory={status.advisory}
                                startLabel="Status terbaru"
                            />
                        )}

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <p className="text-sm uppercase tracking-[0.4em] text-sky-light">Denah Spot & Jalur</p>
                                <h2 className="text-3xl font-semibold md:text-4xl">Rancang pengalaman jelajah Anda</h2>
                                <p className="max-w-2xl text-sm text-white/75">
                                    Spot dikelompokkan berdasarkan kategori agar memudahkan perencanaan rute dan aktivitas konservasi.
                                </p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {spots.map((spot) => (
                                    <SpotCard key={spot.id} {...spot} />
                                ))}
                            </div>
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-white py-20">
                    <PageContainer className="space-y-6">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">
                                Rekomendasi Jalur
                            </p>
                            <h3 className="text-3xl font-semibold md:text-4xl">Kategori aktivitas & jalur interpretasi</h3>
                        </div>
                        <div className="space-y-4">
                            {Object.entries(groupedSpots).map(([type, items]) => (
                                <details
                                    key={type}
                                    className="overflow-hidden rounded-2xl border border-deep-navy/10 bg-foam"
                                >
                                    <summary className="cursor-pointer list-none px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-deep-navy">
                                        {typeLabels[type] ?? type}
                                    </summary>
                                    <div className="space-y-2 px-6 pb-6">
                                        <ul className="grid gap-3 text-sm text-deep-navy/70 md:grid-cols-2">
                                            {items.map((item) => (
                                                <li key={item.id} className="rounded-xl border border-deep-navy/10 bg-white p-4 shadow-reef/10">
                                                    <p className="font-semibold text-deep-navy">{item.name}</p>
                                                    {item.headline && (
                                                        <p className="text-xs text-deep-navy/60">{item.headline}</p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-foam py-20">
                    <PageContainer className="space-y-10">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Agenda Terdekat</p>
                            <h3 className="text-3xl font-semibold md:text-4xl">Ikuti event pendukung perjalanan Anda</h3>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </PageContainer>
                </section>

                <section className="bg-white py-20">
                    <PageContainer className="space-y-6">
                        <div className="space-y-3 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Tips Persiapan</p>
                            <h3 className="text-3xl font-semibold md:text-4xl">Hal-hal penting sebelum berangkat</h3>
                        </div>
                        <ul className="grid gap-4 text-sm text-deep-navy/70 md:grid-cols-2">
                            {visitTips.map((tip, index) => (
                                <li
                                    key={`${tip}-${index}`}
                                    className="rounded-2xl border border-deep-navy/10 bg-foam p-5 shadow-reef/10"
                                >
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}

