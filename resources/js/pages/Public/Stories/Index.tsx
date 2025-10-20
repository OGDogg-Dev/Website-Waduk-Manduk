import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
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

export default function StoriesPage({ stories, filters, types, featured }: StoriesPageProps) {
    const links = useMemo(() => stories.links as PaginationLink[], [stories.links]);

    const handleTypeChange = (value: string) => {
        router.get(route('stories.index'), value === 'all' ? {} : { type: value }, { preserveState: true });
    };

    return (
        <>
            <Head title="Berita & Cerita" />
            <PublicLayout
                hero={
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Berita & Cerita"
                            subtitle="Liputan komunitas, galeri visual, dan update konservasi Waduk Manduk."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-12">
                        {featured.length > 0 && (
                            <div className="space-y-6">
                                <div className="space-y-3 text-deep-navy">
                                    <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Cerita Pilihan</p>
                                    <h2 className="text-3xl font-semibold md:text-4xl">Sorotan narasi yang wajib dibaca</h2>
                                </div>
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {featured.map((story) => (
                                        <StoryCard key={`featured-${story.id}`} {...story} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="flex flex-col gap-4 text-deep-navy md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Semua Cerita</p>
                                    <h2 className="text-3xl font-semibold md:text-4xl">Rangkuman aktivitas terbaru Waduk Manduk</h2>
                                </div>
                                <Select value={filters.type ?? 'all'} onValueChange={handleTypeChange}>
                                    <SelectTrigger className="w-48 rounded-full border border-deep-navy/15 text-deep-navy">
                                        <SelectValue placeholder="Semua jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua jenis</SelectItem>
                                        {types.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {stories.data.map((story) => (
                                    <StoryCard key={`story-${story.id}`} {...story} />
                                ))}
                            </div>
                            <Pagination links={links} />
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
