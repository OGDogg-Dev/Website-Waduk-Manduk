import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { EventCard } from '@/components/public/cards/event-card';
import { SpotCard } from '@/components/public/cards/spot-card';
import { StoryCard } from '@/components/public/cards/story-card';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { PublicLayout } from '@/layouts/public/public-layout';
import type {
    EventResource,
    SpotResource,
    StatusResource,
    StoryResource,
    UmkmResource,
} from '@/types/public';
import { Head, Link } from '@inertiajs/react';

interface HomePageProps {
    status: StatusResource | null;
    featuredSpots: SpotResource[];
    featuredUmkm: UmkmResource[];
    upcomingEvents: EventResource[];
    recentStories: StoryResource[];
}

export default function HomePage({
    status,
    featuredSpots = [],
    featuredUmkm = [],
    upcomingEvents = [],
    recentStories = [],
}: HomePageProps) {
    const spots = featuredSpots;
    const umkm = featuredUmkm;
    const events = upcomingEvents;
    const stories = recentStories;

    const quickHelpItems = [
        {
            href: route('visit.plan'),
            title: 'Rencanakan kunjungan',
            description: 'Cek kapasitas pengunjung, jadwal tur interpretasi, dan jalur akses ramah keluarga.',
        },
        {
            href: route('stories.index'),
            title: 'Ikuti cerita lapangan',
            description: 'Baca dokumentasi konservasi, profil UMKM, dan liputan komunitas terbaru.',
        },
        {
            href: route('support.index'),
            title: 'Dukung konservasi waduk',
            description: 'Salurkan donasi, daftar relawan, atau ajukan kolaborasi program edukasi.',
        },
    ];

    return (
        <>
            <Head title="Beranda" />
            <PublicLayout
                hero={
                    <Hero
                        image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80"
                        alt="Panorama Waduk Manduk saat senja"
                        eyebrow="Ekowisata Bahari"
                        title="Destinasi Ekowisata Waduk Manduk"
                        subtitle="Jelajahi kekayaan hayati waduk, dukung UMKM pesisir, dan terlibat langsung dalam program konservasi."
                        actions={[
                            {
                                label: 'Jelajahi destinasi',
                                href: route('explore.index'),
                            },
                            {
                                label: 'Tonton profil waduk',
                                href: 'https://www.youtube.com',
                                variant: 'ghost',
                                target: '_blank',
                                rel: 'noreferrer',
                            },
                        ]}
                    >
                        {status && (
                            <div className="max-w-xl">
                                <StatusBanner
                                    crowd_level={status.crowd_level}
                                    weather_summary={status.weather_summary}
                                    temperature={status.temperature}
                                    advisory={status.advisory}
                                    startLabel="Status lokasi terbaru"
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
                                <div className="rounded-3xl border border-surface-3/70 bg-surface-1 p-8 shadow-soft">
                                    <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                                        <div className="space-y-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                                                Pengalaman pengunjung
                                            </p>
                                            <h2 className="text-h2 text-text-primary">
                                                Jelajah ekosistem dengan pemandu konservasi
                                            </h2>
                                            <p>
                                                Program interpretasi Waduk Manduk dirancang agar setiap kunjungan berdampak
                                                positif bagi lingkungan dan ekonomi warga.
                                            </p>
                                            <ul className="space-y-2 text-sm text-text-secondary">
                                                <li>• Tur snorkeling, paddle board, dan pelayaran senja terjadwal.</li>
                                                <li>• Edukasi konservasi dan monitoring kualitas air real-time.</li>
                                                <li>• Kurasi UMKM pesisir dan paket kuliner hasil laut berkelanjutan.</li>
                                            </ul>
                                            <div className="flex flex-wrap gap-3">
                                                <Link href={route('visit.plan')} className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-on-dark transition hover:bg-brand-500">
                                                    Lihat paket wisata
                                                </Link>
                                                <Link href={route('support.index')} className="btn-ghost focus-ring">
                                                    Jadwal edukasi komunitas
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden rounded-3xl border border-surface-3/80">
                                            <img
                                                src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80"
                                                alt="Pemandu konservasi mendampingi wisatawan"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {spots.length || umkm.length ? (
                                    <div className="rounded-3xl border border-surface-3/70 bg-surface-0 p-8 shadow-soft">
                                        <h2 className="text-h2 text-text-primary">Sorotan destinasi & UMKM</h2>
                                        <p className="mt-3 text-text-secondary">
                                            Jelajahi spot populer dan dukung pelaku usaha lokal yang mengedepankan praktik ramah lingkungan.
                                        </p>
                                        <div className="mt-6 grid gap-6 lg:grid-cols-2">
                                            {spots.slice(0, 2).map((spot) => (
                                                <SpotCard key={`spot-${spot.id}`} {...spot} />
                                            ))}
                                            {umkm.slice(0, 2).map((item) => (
                                                <UmkmCard key={`umkm-${item.id}`} {...item} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-3xl border border-dashed border-surface-3/70 bg-surface-0 p-8 text-sm text-text-secondary">
                                        Konten sorotan destinasi dan UMKM akan muncul setelah data ditambahkan melalui panel admin.
                                    </div>
                                )}
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Butuh bantuan?"
                                description="Akses informasi penting sebelum berkunjung ke Waduk Manduk."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Butuh bantuan?"
                            description="Akses informasi penting sebelum berkunjung ke Waduk Manduk."
                            className="lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Agenda konservasi & budaya</p>
                                <h2 className="text-h2 text-text-primary">Jadwal kegiatan dalam waktu dekat</h2>
                            </div>
                            <Link href={route('visit.plan')} className="link focus-ring">
                                Semua agenda dan reservasi →
                            </Link>
                        </div>
                        {events.length ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {events.map((event) => (
                                    <EventCard key={`event-${event.id}`} {...event} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-text-secondary">
                                Belum ada agenda terjadwal. Tambahkan event melalui admin untuk menampilkannya di sini.
                            </p>
                        )}
                    </div>
                </section>

                <section className="py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">
                                    Cerita lapangan
                                </p>
                                <h2 className="text-h2 text-text-primary">Dokumentasi terbaru dari tim & komunitas</h2>
                            </div>
                            <Link href={route('stories.index')} className="link focus-ring">
                                Arsip cerita lengkap →
                            </Link>
                        </div>
                        {stories.length ? (
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {stories.map((story) => (
                                    <StoryCard key={`story-${story.id}`} {...story} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-text-secondary">
                                Cerita terbaru akan tampil setelah admin menambahkan publikasi baru.
                            </p>
                        )}
                    </div>
                </section>

                <section className="bg-brand-900 py-12 lg:py-16 text-on-media">
                    <div className="container grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
                        <div className="space-y-4 on-media">
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-on-media/70">
                                Gerakan konservasi
                            </p>
                            <h2 className="text-h2">Bergabung menjaga ekosistem Waduk Manduk</h2>
                            <p className="text-[color:var(--text-on-media-muted)]">
                                Dana konservasi digunakan untuk pemantauan kualitas air, restorasi mangrove, dan program edukasi warga.
                                Kontribusi Anda membuat ekosistem tetap lestari.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href={route('support.index')} className="focus-ring inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-on-dark transition hover:bg-accent-400">
                                    Donasi konservasi
                                </Link>
                                <Link href={route('community.index')} className="btn-ghost focus-ring">
                                    Daftar relawan lapangan
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-sm text-on-media backdrop-blur">
                            <h3 className="text-lg font-semibold">Apa yang Anda dukung?</h3>
                            <ul className="mt-4 space-y-3 text-[color:var(--text-on-media-muted)]">
                                <li>• Penggantian sensor kualitas air dan pelampung monitoring.</li>
                                <li>• Pelatihan mitigasi bencana dan keselamatan pengunjung.</li>
                                <li>• Pendampingan UMKM dan program literasi bahari untuk sekolah.</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
