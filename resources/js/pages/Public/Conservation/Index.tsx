import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, SpotResource, StoryResource } from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface ConservationPageProps {
    educationSpots: SpotResource[];
    conservationStories: StoryResource[];
    programs: EventResource[];
}

const heroImage = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80';

export default function ConservationPage({ educationSpots, conservationStories, programs }: ConservationPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index'),
            title: 'Daftar program konservasi',
            description: 'Ikuti monitoring kualitas air, penanaman mangrove, dan kelas konservasi.',
        },
        {
            href: route('stories.index', { type: 'conservation' }),
            title: 'Catatan lapangan',
            description: 'Baca laporan relawan dan peneliti mengenai kondisi ekosistem waduk.',
        },
        {
            href: route('visit.plan'),
            title: 'Workshop edukasi',
            description: 'Jadwalkan kunjungan sekolah atau komunitas untuk tur interpretasi.',
        },
    ];

    return (
        <>
            <Head title="Konservasi & Edukasi" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Relawan memantau kualitas air waduk"
                        eyebrow="Konservasi & Edukasi"
                        title="Belajar langsung dari ekosistem Waduk Manduk"
                        subtitle="Program konservasi menggabungkan riset, edukasi, dan keterlibatan warga untuk menjaga kualitas air serta keanekaragaman hayati."
                        actions={[
                            { label: 'Program konservasi', href: route('support.index') },
                            { label: 'Materi edukasi', href: route('stories.index', { type: 'conservation' }), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Spot edukasi unggulan</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Jelajahi titik interpretasi flora-fauna, laboratorium lapangan, dan stasiun monitoring kualitas air di waduk.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {educationSpots.map((spot) => (
                                            <SpotCard key={spot.id} {...spot} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Pustaka belajar mandiri</h3>
                                    <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                                        <li>• Modul konservasi mangrove & biomonitoring plankton.</li>
                                        <li>• Panduan keamanan kegiatan air dan mitigasi cuaca ekstrem.</li>
                                        <li>• Data open access sensor kualitas air dan laporan triwulan.</li>
                                    </ul>
                                    <Link href={route('stories.index', { type: 'conservation' })} className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                        Unduh materi edukasi →
                                    </Link>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Pusat konservasi"
                                description="Mulai dari pendaftaran relawan hingga bahan ajar."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Pusat konservasi"
                            description="Mulai dari pendaftaran relawan hingga bahan ajar."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Program konservasi</p>
                                <h2 className="text-h2 text-text-primary">Ikut terjun menjaga ekosistem air</h2>
                            </div>
                            <Link href={route('support.index')} className="link focus-ring">
                                Semua jadwal kegiatan →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {programs.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Cerita konservasi</p>
                                <h2 className="text-h2 text-text-primary">Catatan lapangan relawan & peneliti</h2>
                            </div>
                            <Link href={route('stories.index', { type: 'conservation' })} className="link focus-ring">
                                Arsip cerita konservasi →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {conservationStories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
