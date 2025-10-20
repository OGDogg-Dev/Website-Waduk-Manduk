import { PageContainer } from '@/components/public/layout/page-container';
import { SpotCard } from '@/components/public/cards/spot-card';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import type { SpotResource, UmkmResource } from '@/types/public';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface HighlightsSectionProps {
    featuredSpots: SpotResource[];
    featuredUmkm: UmkmResource[];
}

export function HighlightsSection({ featuredSpots, featuredUmkm }: HighlightsSectionProps) {
    return (
        <section className="bg-white py-20">
            <PageContainer className="space-y-16">
                <div className="space-y-8">
                    <div className="flex flex-col gap-4 text-deep-navy md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Sorotan Spot</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Eksplorasi unggulan Waduk Manduk</h2>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full border-deep-navy/15 px-6 text-deep-navy hover:border-gold-accent hover:text-gold-accent"
                        >
                            <Link href={route('explore.index')}>Lihat semua spot</Link>
                        </Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {featuredSpots.map((spot) => (
                            <SpotCard key={spot.id} {...spot} />
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex flex-col gap-4 text-deep-navy md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">UMKM Lokal</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Kolaborasi rasa pesisir</h2>
                        </div>
                        <Button
                            asChild
                            variant="outline"
                            className="rounded-full border-deep-navy/15 px-6 text-deep-navy hover:border-gold-accent hover:text-gold-accent"
                        >
                            <Link href={route('umkm.directory')}>Lihat semua UMKM</Link>
                        </Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {featuredUmkm.map((umkm) => (
                            <UmkmCard key={umkm.id} {...umkm} />
                        ))}
                    </div>
                </div>
            </PageContainer>
        </section>
    );
}
