import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
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

const heroImage = 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1600&q=80';

const typeLabels: Record<string, string> = {
    entrance: 'Pintu Masuk',
    trail: 'Jalur Interpretasi',
    viewpoint: 'Titik Pandang',
    facility: 'Fasilitas Umum',
    education: 'Edukasi',
};

export default function VisitPage({ status, spots, groupedSpots, upcomingEvents, visitTips }: VisitPageProps) {
    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Peta & jalur',
            description: 'Unduh peta terbaru dan rute rekomendasi sesuai minat Anda.',
        },
        {
            href: route('support.index'),
            title: 'Sewa pemandu',
            description: 'Ajukan pemandu wisata, dokumentasi, dan paket edukasi sekolah.',
        },
        {
            href: route('stories.index', { type: 'gallery' }),
            title: 'Galeri lapangan',
            description: 'Lihat suasana terkini sebelum berangkat ke Waduk Manduk.',
        },
    ];

    return (
        <>
            <Head title="Rencanakan Kunjungan" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Pengunjung menikmati dermaga Waduk Manduk"
                        eyebrow="Rencanakan kunjungan"
                        title="Siapkan perjalanan terbaik Anda"
                        subtitle="Cek status lokasi, pilih jalur interpretasi, dan ketahui perlengkapan wajib sebelum berangkat."
                        actions={[
                            { label: 'Lihat peta spot', href: route('explore.index') },
                            { label: 'Dukung konservasi', href: route('support.index'), variant: 'ghost' },
                        ]}
                    >
                        {status && (
                            <div className="max-w-xl">
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status terbaru"
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
                                    <h2 className="text-h2 text-text-primary">Spot utama & jalur populer</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Gunakan daftar berikut sebagai referensi awal sebelum memilih paket wisata atau menyewa pemandu.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {spots.map((spot) => (
                                            <SpotCard key={spot.id} {...spot} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Kategori jalur & fasilitas</h3>
                                    <div className="mt-4 space-y-4">
                                        {Object.entries(groupedSpots).map(([type, items]) => (
                                            <details key={type} className="overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-0">
                                                <summary className="cursor-pointer list-none px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-text-primary">
                                                    {typeLabels[type] ?? type}
                                                </summary>
                                                <div className="space-y-2 px-6 pb-6 text-sm text-text-secondary">
                                                    <ul className="grid gap-3 md:grid-cols-2">
                                                        {items.map((item) => (
                                                            <li key={item.id} className="rounded-xl border border-surface-3/80 bg-surface-1 p-4">
                                                                <p className="font-semibold text-text-primary">{item.name}</p>
                                                                {item.headline && <p className="text-xs text-text-secondary">{item.headline}</p>}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Bantuan perjalanan"
                                description="Informasi penting sebelum berangkat."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan perjalanan"
                            description="Informasi penting sebelum berangkat."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Agenda terdekat</p>
                                <h2 className="text-h2 text-text-primary">Event yang mendukung perjalanan Anda</h2>
                            </div>
                            <Link href={route('explore.index')} className="link focus-ring">
                                Semua agenda wisata →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Tips persiapan</p>
                            <h2 className="text-h2 text-text-primary">Hal penting sebelum berangkat</h2>
                        </div>
                        <ul className="grid gap-4 text-sm text-text-secondary md:grid-cols-2">
                            {visitTips.map((tip, index) => (
                                <li key={`${tip}-${index}`} className="rounded-2xl border border-surface-3/80 bg-surface-0 p-5 shadow-soft">
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
