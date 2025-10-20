import { Hero } from '@/components/public/hero';
import { StoryCard } from '@/components/public/story-card';
import { Pagination } from '@/components/common/pagination';
import { Button } from '@/components/ui/button';
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
                    <Hero
                        title="Berita & Cerita"
                        subtitle="Liputan komunitas, galeri visual, dan update konservasi Waduk Manduk."
                    />
                }
            >
                <div className="space-y-12">
                    {featured.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                Cerita Pilihan
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {featured.map((story) => (
                                    <StoryCard key={`featured-${story.id}`} {...story} />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="space-y-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                Semua Cerita
                            </h2>
                            <Select value={filters.type ?? 'all'} onValueChange={handleTypeChange}>
                                <SelectTrigger className="w-48">
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
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {stories.data.map((story) => (
                                <StoryCard key={`story-${story.id}`} {...story} />
                            ))}
                        </div>
                        <Pagination links={links} />
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}
