import { PageContainer } from '@/components/public/layout/page-container';
import { StoryCard } from '@/components/public/cards/story-card';
import type { StoryResource } from '@/types/public';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface ArticlesSectionProps {
    stories: StoryResource[];
}

export function ArticlesSection({ stories }: ArticlesSectionProps) {
    return (
        <section className="bg-[#001123] py-20 text-white">
            <PageContainer className="space-y-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl space-y-4">
                        <p className="text-sm uppercase tracking-[0.4em] text-sky-light">Artikel & Dokumentasi</p>
                        <h2 className="text-3xl font-semibold md:text-4xl">Catatan lapangan terbaru dari Waduk Manduk</h2>
                    </div>
                    <Button
                        asChild
                        variant="ghost"
                        className="rounded-full border border-white/20 px-6 text-white hover:bg-white/10"
                    >
                        <Link href={route('stories.index')}>Lihat arsip lengkap</Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {stories.map((story, index) => (
                        <StoryCard
                            key={story.id}
                            {...story}
                            className={index === 1 ? 'md:scale-[1.03] md:border-gold-accent/60' : undefined}
                        />
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}
