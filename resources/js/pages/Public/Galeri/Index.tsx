import { Head, Link } from '@inertiajs/react';
import { EventCard } from '@/components/public/cards/event-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Breadcrumbs } from '@/components/public/breadcrumbs';
import type { EventResource, StoryResource } from '@/types/public';

interface KomunitasPageProps {
    events: EventResource[];
    stories: StoryResource[];
}

export default function KomunitasPage({ events = [], stories = [] }: KomunitasPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index', { type: 'volunteer' }),
            title: 'Daftar relawan lapangan',
            description: 'Ikut aksi reresik waduk, monitoring mangrove, hingga edukasi sekolah.',
        },
        {
            href: route('support.index', { type: 'donation' }),
            title: 'Dukungan logistik komunitas',
            description: 'Salurkan peralatan dan dana operasional bagi komunitas pesisir.',
        },
        {
            href: route('stories.index', { type: 'community' }),
            title: 'Cerita komunitas terbaru',
            description: 'Baca kisah warga, UMKM, dan mitra CSR dalam menjaga waduk.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Komunitas Waduk Manduk">
                <meta
                    name="description"
                    content="Kolaborasi warga, relawan, dan mitra dalam menjaga Waduk Manduk. Temukan agenda komunitas dan cerita inspiratif."
                />
                <meta property="og:title" content="Komunitas Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Ikuti agenda komunitas, kisah relawan, dan dukungan warga untuk menjaga Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('community.index')} />
            </Head>

            <PageHero
                eyebrow="Gerakan warga"
                title="Komunitas Waduk Manduk"
                description="Gabungkan langkah Anda bersama warga pesisir, relawan, dan mitra untuk memastikan Waduk Manduk terus lestari."
                actions={[
                    {
                        label: 'Gabung forum komunitas',
                        href: 'mailto:komunitas@wadukmanduk.id',
                    },
                ]}
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Langkah cepat"
                quickHelpDescription="Mulai dari pendaftaran relawan, dukungan logistik, hingga dokumentasi kegiatan."
                quickHelpCta={{
                    label: 'Gabung forum komunitas',
                    href: 'mailto:komunitas@wadukmanduk.id',
                    description: 'komunitas@wadukmanduk.id',
                }}
            >
                <Breadcrumbs items={[{ label: 'Komunitas' }]} className="mt-8" />
            </PageHero>

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-30%] top-[-20rem] h-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(49,132,230,0.24),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Agenda komunitas</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Jadwal kegiatan terdekat</h2>
                            <p className="max-w-3xl text-white/90">
                                Temukan aksi konservasi, pelatihan UMKM, hingga festival budaya yang digelar oleh warga Manduk.
                            </p>
                        </div>
                        <Link
                            href={route('visit.plan')}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Lihat kalender lengkap →
                        </Link>
                    </div>
                    {events.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {events.map((event) => (
                                <EventCard key={`event-${event.id}`} {...event} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Agenda komunitas akan muncul otomatis setelah ditambahkan melalui panel admin.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/80">Cerita relawan & warga</p>
                            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Kisah menjaga waduk bersama</h2>
                            <p className="max-w-3xl text-white/90">
                                Dokumentasikan aksi Anda atau baca pengalaman relawan lain yang berbagi inspirasi dan pembelajaran.
                            </p>
                        </div>
                        <Link
                            href={route('stories.index', { type: 'community' })}
                            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white hover:border-white/35 hover:bg-white/10"
                        >
                            Arsip cerita komunitas →
                        </Link>
                    </div>
                    {stories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/85">
                            Cerita komunitas akan tampil otomatis setelah admin mempublikasikan konten terbaru.
                        </p>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[linear-gradient(150deg,#f7d08a_0%,#f0af5a_35%,#ee9740_70%,#e1842d_100%)] py-16 text-brand-950 lg:py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.32),_rgba(237,160,76,0))]" aria-hidden />
                <div className="container relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
                    <div className="space-y-4">
                        <span className="inline-flex w-max items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-brand-900">
                            Dokumentasi komunitas
                        </span>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Bagikan dokumentasi kegiatan Anda</h2>
                        <p className="max-w-2xl text-base text-brand-900/80">
                            Kirim foto, video, atau laporan singkat untuk ditampilkan pada kanal komunitas Waduk Manduk.
                        </p>
                        <Link
                            href="mailto:dokumentasi@wadukmanduk.id"
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                        >
                            Kirim dokumentasi →
                        </Link>
                    </div>
                    <div className="rounded-[2rem] border border-black/10 bg-white/75 p-6 shadow-soft backdrop-blur">
                        <p className="text-sm font-semibold text-brand-900">Format yang diterima</p>
                        <ul className="mt-3 space-y-2 text-sm text-brand-900/80">
                            <li>• Foto resolusi tinggi (minimal 2000px)</li>
                            <li>• Video maksimal 60 detik (MP4)</li>
                            <li>• Narasi singkat 150–250 kata</li>
                        </ul>
                        <p className="mt-4 text-xs text-brand-900/70">
                            Konten akan dikurasi sebelum dipublikasikan. Sertakan nama komunitas dan kontak narahubung.
                        </p>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
