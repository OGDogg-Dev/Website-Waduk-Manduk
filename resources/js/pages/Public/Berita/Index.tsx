import { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { PublicLayout } from '@/layouts/public/public-layout';
import { StoryCard } from '@/components/public/cards/story-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PaginatedResponse } from '@/types/pagination';
import type { StoryResource } from '@/types/public';
import { Skeleton } from '@/components/ui/skeleton';

interface BeritaPageProps {
    stories: PaginatedResponse<StoryResource>;
    filters: { type?: string | null };
    types: Array<{ value: string; label: string }>;
    featured: StoryResource[];
}

export default function BeritaPage({ stories, filters, types, featured }: BeritaPageProps) {
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);

    const storiesData = useMemo(() => stories.data as StoryResource[], [stories.data]);

    useEffect(() => {
        setVisibleCount((current) => Math.min(Math.max(current, 6), storiesData.length || 0));
    }, [storiesData]);

    const handleTypeChange = (value: string) => {
        router.get(route('stories.index'), value === 'all' ? {} : { type: value }, { preserveState: true });
    };

    const handleLoadMore = () => {
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((current) => Math.min(current + 3, storiesData.length));
            setLoadingMore(false);
        }, 500);
    };

    const quickHelpItems = [
        {
            href: route('stories.index', { type: 'conservation' }),
            title: 'Laporan konservasi',
            description: 'Pantau kabar sensor kualitas air, rehabilitasi terumbu, dan aksi mangrove.',
        },
        {
            href: route('stories.index', { type: 'community' }),
            title: 'Cerita komunitas',
            description: 'Kolaborasi warga dan UMKM dalam menjaga waduk tetap lestari.',
        },
        {
            href: route('stories.index', { type: 'gallery' }),
            title: 'Galeri visual',
            description: 'Rangkum dokumentasi foto/video terbaru langsung dari lapangan.',
        },
    ];

    const canLoadMore = visibleCount < storiesData.length;

    return (
        <PublicLayout>
            <Head title="Berita & Cerita">
                <meta
                    name="description"
                    content="Kumpulan berita, cerita komunitas, dan liputan konservasi Waduk Manduk lengkap dengan sorotan mingguan."
                />
                <meta property="og:title" content="Berita & Cerita Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Ikuti perkembangan konservasi, komunitas, dan UMKM melalui artikel pilihan dari Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('stories.index')} />
            </Head>

            <PageHero
                eyebrow="Berita & cerita"
                title="Berita & Cerita"
                description="Luaskan wawasan, gali inspirasi, dan update konservasi Waduk Manduk langsung dari tim lapangan."
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Filter cepat"
                quickHelpDescription="Temukan artikel berdasarkan fokus tema yang Anda perlukan."
                quickHelpCta={{
                    label: 'Kirim rilis media',
                    href: route('support.index'),
                    description: 'Pusat layanan media & kolaborasi',
                }}
            />

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(60,138,233,0.28),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">Cerita pilihan</p>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Sorotan pekan ini</h2>
                        <p className="max-w-3xl text-brand-100/80">
                            Tiga cerita pilihan editor menampilkan dampak kolaborasi konservasi, inovasi UMKM, dan aksi komunitas.
                        </p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-3">
                        {featured.length > 0 ? (
                            featured.map((story) => <StoryCard key={`featured-${story.id}`} {...story} />)
                        ) : (
                            <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-brand-100/80 lg:col-span-3">
                                Sorotan akan muncul setelah admin memilih artikel unggulan minggu ini.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-22rem] h-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(240,180,92,0.22),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">Semua cerita</p>
                            <h2 className="text-3xl font-semibold sm:text-4xl">Kabar terbaru dari waduk</h2>
                            <p className="max-w-3xl text-brand-100/75">
                                Telusuri seluruh arsip cerita dari tim konservasi, warga relawan, hingga pelaku UMKM pesisir.
                            </p>
                        </div>
                        <Select value={filters.type ?? 'all'} onValueChange={handleTypeChange}>
                            <SelectTrigger className="w-full rounded-full border border-white/25 bg-white/10 text-sm font-semibold text-white focus:ring-0 focus-visible:ring-0 lg:w-60">
                                <SelectValue placeholder="Semua topik" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border border-white/15 bg-[#051a36] text-white shadow-soft">
                                <SelectItem value="all">Semua topik</SelectItem>
                                {types.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {storiesData.slice(0, visibleCount).map((story) => (
                            <StoryCard key={`story-${story.id}`} {...story} />
                        ))}
                        {loadingMore && (
                            <div className="space-y-3 rounded-[2rem] border border-dashed border-white/20 bg-white/8 p-6">
                                <Skeleton className="h-40 w-full rounded-2xl" />
                                <Skeleton className="h-5 w-3/4 rounded-full" />
                                <Skeleton className="h-4 w-full rounded-full" />
                                <Skeleton className="h-4 w-2/3 rounded-full" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleLoadMore}
                            disabled={!canLoadMore || loadingMore}
                            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-brand-950 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/40"
                        >
                            {canLoadMore ? (loadingMore ? 'Memuat…' : 'Muat lebih banyak') : 'Semua cerita telah ditampilkan'}
                        </button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
