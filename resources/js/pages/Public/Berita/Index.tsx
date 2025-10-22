import { useEffect, useMemo, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public/public-layout';
import { Hero } from '@/components/public/Hero';
import { StoryCard } from '@/components/public/cards/story-card';
import { QuickHelp } from '@/components/public/QuickHelp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StoryResource } from '@/types/public';
import type { PaginatedResponse } from '@/types/pagination';
import { Skeleton } from '@/components/ui/skeleton';

interface BeritaPageProps {
    stories: PaginatedResponse<StoryResource>;
    filters: { type?: string | null };
    types: Array<{ value: string; label: string }>;
    featured: StoryResource[];
}

const heroImageBase = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d';
const heroImageParams = '?auto=format&fit=crop';
const heroImageSrcSet = [
    `${heroImageBase}${heroImageParams}&w=640&q=80 640w`,
    `${heroImageBase}${heroImageParams}&w=960&q=80 960w`,
    `${heroImageBase}${heroImageParams}&w=1280&q=80 1280w`,
    `${heroImageBase}${heroImageParams}&w=1600&q=80 1600w`,
    `${heroImageBase}${heroImageParams}&w=2000&q=80 2000w`,
].join(', ');

export default function BeritaPage({ stories, filters, types, featured }: BeritaPageProps) {
    const [visibleCount, setVisibleCount] = useState(6);
    const [loadingMore, setLoadingMore] = useState(false);

    const quickHelpItems = [
        {
            href: route('stories.index', { type: 'conservation' }),
            title: 'Laporan konservasi',
            description: 'Pantau kabar sensor kualitas air dan aksi rehabilitasi ekosistem.',
        },
        {
            href: route('stories.index', { type: 'community' }),
            title: 'Cerita komunitas',
            description: 'Ikuti kolaborasi warga dan UMKM dalam menjaga waduk.',
        },
        {
            href: route('stories.index', { type: 'gallery' }),
            title: 'Galeri visual',
            description: 'Kumpulan dokumentasi foto/video terbaru dari destinasi.',
        },
    ];

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

    const canLoadMore = visibleCount < storiesData.length;

    return (
        <PublicLayout
            hero={
                <Hero
                    image={`${heroImageBase}${heroImageParams}&w=1600&q=80`}
                    imageSrcSet={heroImageSrcSet}
                    imageSizes="(min-width: 1280px) 1100px, (min-width: 768px) 90vw, 100vw"
                    alt="Fotografer mendokumentasikan Waduk Manduk"
                    eyebrow="Berita & Artikel"
                    title="Kabar terbaru Waduk Manduk"
                    subtitle="Rangkum aktivitas konservasi, agenda komunitas, dan sorotan UMKM setiap pekan."
                    actions={[
                        { label: 'Kirim rilis media', href: route('community.index') },
                        { label: 'Lihat arsip cerita', href: route('stories.index'), variant: 'ghost' },
                    ]}
                />
            }
        >
            <Head title="Berita">
                <meta
                    name="description"
                    content="Ikuti kabar konservasi, komunitas, dan UMKM Waduk Manduk dengan filter topik dan sorotan pekan ini."
                />
                <meta property="og:title" content="Berita Terbaru Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Baca artikel dan liputan terbaru seputar konservasi dan kegiatan warga Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('stories.index')} />
            </Head>

            <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                />
                <div className="container">
                    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                        <div className="space-y-8">
                            {featured.length > 0 && (
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Sorotan pekan ini</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Tiga cerita teratas pilihan redaksi yang menggambarkan dampak konservasi dan wisata berkelanjutan.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {featured.map((story) => (
                                            <StoryCard key={`featured-${story.id}`} {...story} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="eyebrow text-xs text-brand-600">Semua berita</p>
                                        <h3 className="text-h3 text-text-primary">Update terbaru dari tim lapangan</h3>
                                    </div>
                                    <Select value={filters.type ?? 'all'} onValueChange={handleTypeChange}>
                                        <SelectTrigger className="w-full rounded-full border border-surface-3/80 bg-surface-0 text-text-primary focus:ring-0 focus-visible:ring-0 lg:w-56">
                                            <SelectValue placeholder="Semua topik" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-2xl border border-surface-3/60 bg-surface-0 text-text-primary shadow-soft">
                                            <SelectItem value="all">Semua topik</SelectItem>
                                            {types.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {storiesData.slice(0, visibleCount).map((story) => (
                                        <StoryCard key={`story-${story.id}`} {...story} />
                                    ))}
                                    {loadingMore && (
                                        <div className="space-y-3 rounded-3xl border border-dashed border-surface-3/70 bg-surface-0 p-6">
                                            <Skeleton className="h-40 w-full rounded-2xl" />
                                            <Skeleton className="h-5 w-3/4 rounded-full" />
                                            <Skeleton className="h-4 w-full rounded-full" />
                                            <Skeleton className="h-4 w-2/3 rounded-full" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={handleLoadMore}
                                        disabled={!canLoadMore || loadingMore}
                                        className="focus-ring inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-on-dark transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-brand-300"
                                    >
                                        {canLoadMore ? (loadingMore ? 'Memuat…' : 'Muat lebih banyak') : 'Semua berita telah ditampilkan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Filter cepat"
                            description="Telusuri cerita berdasarkan tema tertentu."
                            className="hidden lg:block"
                        />
                    </div>
                    <div className="mt-8 lg:hidden">
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Filter cepat"
                            description="Telusuri cerita berdasarkan tema tertentu."
                        />
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
