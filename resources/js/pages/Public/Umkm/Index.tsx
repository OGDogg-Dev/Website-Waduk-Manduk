import { Hero } from '@/components/public/hero';
import { UmkmCard } from '@/components/public/umkm-card';
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
                    <Hero
                        title="UMKM & Kuliner Waduk Manduk"
                        subtitle="Nikmati kuliner lokal, beli produk kerajinan warga, dan dukung ekonomi komunitas."
                    />
                }
            >
                <section className="space-y-6">
                    <div className="rounded-2xl border border-border bg-muted/20 p-4">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <Input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Cari nama UMKM atau produk..."
                                className="md:w-80"
                            />
                            <select
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((item) => (
                            <UmkmCard key={item.id} {...item} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                            UMKM belum ditemukan untuk filter tersebut. Coba kategori lain atau reset pencarian.
                        </div>
                    )}
                </section>
            </PublicLayout>
        </>
    );
}
