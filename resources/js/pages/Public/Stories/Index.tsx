import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { StoryCard } from '@/components/public/cards/story-card';
import { Pagination } from '@/components/common/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StoryResource } from '@/types/public';
import type { PaginatedResponse, PaginationLink } from '@/types/pagination';
import { Head, router } from '@inertiajs/react';
import { useMemo } from 'react';

interface StoriesPageProps {
    stories: PaginatedResponse<StoryResource>;
    filters: {
        type?: string | null;
    };
    types: Array<{ value: string; label: string }>;
    featured: StoryResource[];
}

const heroImage = 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1600&q=80';

export default function StoriesPage({ stories, filters, types, featured }: StoriesPageProps) {
    const links = useMemo(() => stories.links as PaginationLink[], [stories.links]);

    const handleTypeChange = (value: string) => {
        router.get(route('stories.index'), value === 'all' ? {} : { type: value }, { preserveState: true });
    };

    const quickHelpItems = [
        {
            href: route('stories.index', { type: 'conservation' }),
            title: 'Cerita konservasi',
            description: 'Pantau laporan sensor, aktivitas relawan, dan edukasi lingkungan.',
        },
        {
            href: route('stories.index', { type: 'community' }),
            title: 'Komunitas & relawan',
            description: 'Ikuti kisah warga menjaga waduk serta program pemberdayaan UMKM.',
        },
        {
            href: route('stories.index', { type: 'gallery' }),
            title: 'Galeri visual',
            description: 'Kumpulan foto dan video terbaru dari perjalanan wisata dan konservasi.',
        },
    ];

    return (
        <>
            <Head title="Berita & Cerita" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Fotografer mendokumentasikan Waduk Manduk"
                        eyebrow="Berita & Cerita"
                        title="Liputan komunitas, galeri, dan kabar konservasi"
                        subtitle="Temukan rangkuman aktivitas terbaru, kisah inspiratif, dan dokumentasi visual dari Waduk Manduk."
                        actions={[
                            { label: 'Kirim cerita Anda', href: route('community.index') },
                            { label: 'Arsip konservasi', href: route('stories.index', { type: 'conservation' }), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                {featured.length > 0 && (
                                    <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                        <h2 className="text-h2 text-text-primary">Cerita pilihan</h2>
                                        <p className="mt-3 text-text-secondary">Sorotan narasi yang menggambarkan inovasi konservasi dan kolaborasi warga.</p>
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
                                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Semua cerita</p>
                                            <h3 className="text-h3 text-text-primary">Rangkuman aktivitas terbaru Waduk Manduk</h3>
                                        </div>
                                        <Select value={filters.type ?? 'all'} onValueChange={handleTypeChange}>
                                            <SelectTrigger className="w-full rounded-full border border-surface-3/80 bg-surface-0 text-text-primary focus:ring-0 focus-visible:ring-0 lg:w-48">
                                                <SelectValue placeholder="Semua jenis" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-2xl border border-surface-3/60 bg-surface-0 text-text-primary shadow-soft">
                                                <SelectItem value="all">Semua jenis</SelectItem>
                                                {types.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {stories.data.map((story) => (
                                            <StoryCard key={`story-${story.id}`} {...story} />
                                        ))}
                                    </div>
                                    <div className="mt-6">
                                        <Pagination links={links} />
                                    </div>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Filter cepat"
                                description="Telusuri cerita berdasarkan tema yang Anda butuhkan."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Filter cepat"
                            description="Telusuri cerita berdasarkan tema yang Anda butuhkan."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
