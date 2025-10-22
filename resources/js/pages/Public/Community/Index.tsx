import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { EventCard } from '@/components/public/cards/event-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { EventResource, StoryResource } from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface CommunityPageProps {
    events: EventResource[];
    stories: StoryResource[];
}

const heroImage = 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80';

export default function CommunityPage({ events, stories }: CommunityPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index'),
            title: 'Daftar relawan',
            description: 'Gabung aksi reresik waduk, mitigasi banjir, dan edukasi sekolah.',
        },
        {
            href: route('stories.index', { type: 'community' }),
            title: 'Kirim dokumentasi',
            description: 'Bagikan laporan foto/video kegiatan komunitas Anda untuk dikurasi.',
        },
        {
            href: route('visit.plan'),
            title: 'Pinjam fasilitas',
            description: 'Ajukan penggunaan perahu, alat snorkel, atau ruang komunitas.',
        },
    ];

    return (
        <>
            <Head title="Komunitas" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Relawan membersihkan tepi Waduk Manduk"
                        eyebrow="Komunitas Waduk Manduk"
                        title="Kuat karena gerakan warga & relawan"
                        subtitle="Dari reresik waduk sampai kelas konservasi, seluruh program dijalankan partisipatif bersama komunitas."
                        actions={[
                            { label: 'Jadwal aksi reresik', href: route('support.index') },
                            { label: 'Dokumentasi komunitas', href: route('stories.index', { type: 'community' }), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Agenda komunitas terdekat</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Ikuti pelatihan safety, bersih-bersih waduk, hingga tur interpretasi bersama warga dan fasilitator konservasi.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {events.map((event) => (
                                            <EventCard key={event.id} {...event} />
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Cara bergabung</h3>
                                    <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                                        <li>• Reresik waduk rutin tiap Sabtu pagi (maks. 40 relawan).</li>
                                        <li>• Kelas konservasi dan pengamatan biota air setiap bulan.</li>
                                        <li>• Pendampingan UMKM dan pelatihan pelayanan wisata.</li>
                                    </ul>
                                    <Link href={route('support.index')} className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                        Daftar program relawan →
                                    </Link>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Pusat komunitas"
                                description="Temukan kanal komunikasi dan formulir kolaborasi."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Pusat komunitas"
                            description="Temukan kanal komunikasi dan formulir kolaborasi."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                                    Cerita relawan & warga
                                </p>
                                <h2 className="text-h2 text-text-primary">Jejak aksi komunitas menjaga waduk</h2>
                            </div>
                            <Link href={route('stories.index', { type: 'community' })} className="link focus-ring">
                                Arsip cerita komunitas →
                            </Link>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
