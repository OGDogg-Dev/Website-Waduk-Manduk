import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
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

const heroImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80';

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

    const quickHelpItems = [
        {
            href: route('support.index'),
            title: 'Program pendampingan',
            description: 'Pelatihan branding, kemasan ramah lingkungan, dan pemasaran digital.',
        },
        {
            href: route('stories.index', { type: 'umkm' }),
            title: 'Cerita UMKM mitra',
            description: 'Profil usaha, inovasi produk, dan dampak ekonomi warga.',
        },
        {
            href: route('visit.plan'),
            title: 'Paket kuliner',
            description: 'Paket wisata kuliner dan rute kunjungan ke sentra produksi.',
        },
    ];

    return (
        <>
            <Head title="UMKM & Kuliner" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Pelaku UMKM Waduk Manduk menyiapkan produk"
                        eyebrow="UMKM & Kuliner"
                        title="Kurasi rasa dan kriya pesisir Waduk Manduk"
                        subtitle="Nikmati kuliner laut berkelanjutan, produk kriya warga, dan dukung ekonomi komunitas."
                        actions={[
                            { label: 'Pesan paket kuliner', href: route('visit.plan') },
                            { label: 'Cerita UMKM', href: route('stories.index', { type: 'umkm' }), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="relative bg-surface-0 pb-16 pt-28 lg:pt-32">
                    <span
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(2,18,41,0.08)_0%,rgba(255,255,255,0)_100%)]"
                    />
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Direktori UMKM</p>
                                            <h2 className="text-h2 text-text-primary">Cari UMKM mitra dan produk unggulan</h2>
                                        </div>
                                        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
                                            <Input
                                                value={query}
                                                onChange={(event) => setQuery(event.target.value)}
                                                placeholder="Cari nama UMKM atau produk..."
                                                className="rounded-full border border-surface-3/80 bg-surface-0 text-sm text-text-primary focus:border-brand-400 focus:ring-0 lg:w-64"
                                            />
                                            <select
                                                value={category}
                                                onChange={(event) => setCategory(event.target.value)}
                                                className="h-11 rounded-full border border-surface-3/80 bg-surface-0 px-4 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-400"
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
                                    <div className="rounded-3xl border border-dashed border-surface-3/70 p-10 text-center text-sm text-text-secondary">
                                        UMKM belum ditemukan untuk filter tersebut. Coba kategori lain atau reset pencarian.
                                    </div>
                                )}
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Bantuan UMKM"
                                description="Mulai dari pendampingan hingga paket kuliner."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan UMKM"
                            description="Mulai dari pendampingan hingga paket kuliner."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
