import { Head, Link } from '@inertiajs/react';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import type { EventResource, SpotResource, StoryResource } from '@/types/public';

interface ConservationPageProps {
    educationSpots: SpotResource[];
    conservationStories: StoryResource[];
    programs: EventResource[];
}

export default function ConservationPage({ educationSpots, conservationStories, programs }: ConservationPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index', { type: 'volunteer' }),
            title: 'Daftar relawan konservasi',
            description: 'Ikut monitoring kualitas air, transplantasi terumbu, dan penanaman mangrove.',
        },
        {
            href: route('stories.index', { type: 'conservation' }),
            title: 'Catatan lapangan',
            description: 'Baca laporan berkala dari peneliti dan relawan tentang kondisi ekosistem.',
        },
        {
            href: route('visit.plan'),
            title: 'Workshop edukasi',
            description: 'Jadwalkan tur interpretasi dan sesi belajar langsung di laboratorium hidup.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Konservasi & Edukasi">
                <meta
                    name="description"
                    content="Program konservasi Waduk Manduk menggabungkan riset, edukasi, dan aksi warga untuk menjaga kualitas ekosistem."
                />
                <meta property="og:title" content="Konservasi & Edukasi Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Telusuri spot edukasi, program konservasi, dan cerita lapangan dari relawan Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('conservation.index')} />
            </Head>

            <PageHero
                eyebrow="Konservasi & edukasi"
                title="Konservasi & Edukasi"
                description="Belajar langsung dari ekosistem Waduk Manduk bersama tim konservasi, peneliti, dan warga pesisir."
                actions={[
                    {
                        label: 'Daftar relawan',
                        href: route('support.index', { type: 'volunteer' }),
                    },
                ]}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Pusat konservasi"
                quickHelpDescription="Mulai dari pendaftaran relawan hingga bahan ajar kelas konservasi."
                quickHelpCta={{
                    label: 'Unduh materi belajar',
                    href: route('stories.index', { type: 'conservation' }),
                    description: 'Modul konservasi & laporan lapangan',
                }}
            >
                <Breadcrumbs items={[{ label: 'Konservasi & Edukasi' }]} className="mt-8" />
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(48,138,228,0.25),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Spot edukasi</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Laboratorium alam Waduk Manduk</h2>
                            <p className="max-w-3xl text-white/90">
                                Jelajahi titik interpretasi flora-fauna, stasiun sensor kualitas air, dan jalur riset lapangan.
                            </p>
                        </div>
                        <Link
                            href={route('explore.index')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Lihat peta edukasi →
                        </Link>
                    </div>
                    {educationSpots.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {educationSpots.map((spot) => (
                                <SpotCard key={spot.id} {...spot} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Data spot edukasi akan tampil setelah admin menambahkannya melalui panel pengelola.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Program konservasi</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Ikut terjun menjaga ekosistem</h2>
                            <p className="max-w-3xl text-white/90">
                                Daftar pada sesi konservasi berkala untuk mendukung keberlanjutan Waduk Manduk.
                            </p>
                        </div>
                        <Link
                            href={route('support.index', { type: 'volunteer' })}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Jadwal lengkap →
                        </Link>
                    </div>
                    {programs.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {programs.map((event) => (
                                <EventCard key={event.id} {...event} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Program akan muncul setelah tim konservasi menambahkan jadwal terbaru.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#040f24] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(72,150,255,0.2),_rgba(4,15,36,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Catatan lapangan</p>
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Cerita konservasi terbaru</h2>
                        <p className="max-w-3xl text-white/90">
                            Pelajari hasil monitoring dan cerita dampak dari relawan serta peneliti yang menjaga Waduk Manduk.
                        </p>
                    </div>
                    {conservationStories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {conservationStories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Cerita lapangan akan tersedia begitu admin mempublikasikan konten baru.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
