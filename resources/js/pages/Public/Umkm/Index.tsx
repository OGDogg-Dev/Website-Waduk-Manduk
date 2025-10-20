import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { UmkmResource } from '@/types/public';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface UmkmPageProps {
    umkm: UmkmResource[];
    categories: string[];
}

export default function UmkmPage({ umkm, categories }: UmkmPageProps) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');

    const filtered = useMemo(() => {
        return umkm.filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = category === 'all' || item.category === category;
            return matchesQuery && matchesCategory;
        });
    }, [umkm, query, category]);

    return (
        <>
            <Head title="UMKM & Kuliner" />
            <PublicLayout
                hero={
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="UMKM & Kuliner Waduk Manduk"
                            subtitle="Nikmati kuliner lokal, beli produk kerajinan warga, dan dukung ekonomi komunitas."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-10">
                        <div className="rounded-[32px] border border-deep-navy/10 bg-foam p-6 shadow-reef/10">
                            <div className="flex flex-col gap-4 text-deep-navy md:flex-row md:items-center md:justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Direktori UMKM</p>
                                    <h2 className="text-3xl font-semibold md:text-4xl">
                                        Kurasi rasa dan kriya pesisir Waduk Manduk
                                    </h2>
                                </div>
                                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                                    <Input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Cari nama UMKM atau produk..."
                                        className="md:w-72"
                                    />
                                    <select
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                        className="h-11 rounded-full border border-deep-navy/15 bg-white px-4 text-sm text-deep-navy focus:outline-none focus:ring-2 focus:ring-gold-accent"
                                    >
                                        <option value="all">Semua kategori</option>
                                        {categories.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {filtered.map((item) => (
                                <UmkmCard key={item.id} {...item} />
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="rounded-3xl border border-dashed border-deep-navy/20 p-10 text-center text-sm text-deep-navy/60">
                                UMKM belum ditemukan untuk filter tersebut. Coba kategori lain atau reset pencarian.
                            </div>
                        )}
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
