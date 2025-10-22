import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { UmkmCard } from '@/components/public/cards/umkm-card';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { UmkmResource } from '@/types/public';

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

    const quickHelpItems = [
        {
            href: route('support.index', { type: 'partnership' }),
            title: 'Program pendampingan',
            description: 'Pelatihan branding, sertifikasi keamanan pangan, dan pemasaran digital.',
        },
        {
            href: route('stories.index', { type: 'umkm' }),
            title: 'Cerita UMKM mitra',
            description: 'Profil usaha, inovasi produk, dan dampak ekonomi warga pesisir.',
        },
        {
            href: route('visit.plan'),
            title: 'Paket tur kuliner',
            description: 'Jadwalkan pengalaman kuliner pesisir dan kunjungan ke sentra produksi.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="UMKM & Kuliner Waduk Manduk">
                <meta
                    name="description"
                    content="Direktori UMKM pesisir Waduk Manduk lengkap dengan filter kategori, program pendampingan, dan paket kuliner."
                />
                <meta property="og:title" content="UMKM & Kuliner Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Temukan UMKM mitra, program pendampingan, dan paket kuliner pesisir Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('umkm.directory')} />
            </Head>

            <PageHero
                eyebrow="UMKM & kuliner"
                title="UMKM & Kuliner Waduk Manduk"
                description="Nikmati kuliner laut berkelanjutan, produk kriya warga, dan dukung ekonomi lokal lewat program pendampingan UMKM."
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Bantuan UMKM"
                quickHelpDescription="Pendampingan usaha, akses pasar, dan paket kuliner tematik."
                quickHelpCta={{
                    label: 'Hubungi pusat UMKM',
                    href: 'mailto:umkm@wadukmanduk.id',
                    description: 'umkm@wadukmanduk.id',
                }}
            />

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(60,138,233,0.25),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-8">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">Direktori UMKM</p>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Temukan produk unggulan pesisir</h2>
                        <p className="max-w-3xl text-brand-100/80">
                            Filter berdasarkan kategori atau cari langsung UMKM favorit Anda. Semua pelaku usaha telah melalui kurasi kelayakan.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 rounded-[2rem] border border-white/15 bg-white/8 p-6 shadow-soft backdrop-blur lg:flex-row lg:items-center lg:justify-between">
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Cari nama UMKM atau produk..."
                            className="rounded-full border border-white/20 bg-white/10 text-sm text-white placeholder:text-brand-100/60 focus:border-white focus:ring-0 lg:w-72"
                        />
                        <select
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                            className="h-12 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            <option value="all">Semua kategori</option>
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((item) => (
                            <UmkmCard key={item.id} {...item} />
                        ))}
                    </div>
                    {filtered.length === 0 && (
                        <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-10 text-center text-sm text-brand-100/80">
                            UMKM belum ditemukan untuk filter tersebut. Coba kategori lain atau reset pencarian.
                        </div>
                    )}
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-8 lg:grid-cols-3">
                    {["Kurasi rasa pesisir", "Program peningkatan kapasitas", "Kemasan ramah lingkungan"].map((title, index) => (
                        <div key={title} className="space-y-3 rounded-[2rem] border border-white/12 bg-white/6 p-6 text-sm text-brand-100/80">
                            <p className="text-base font-semibold text-white">{title}</p>
                            <p>
                                {index === 0 && 'Koleksi kuliner laut yang diolah langsung oleh warga dengan bahan segar dan teknik ramah lingkungan.'}
                                {index === 1 && 'Pendampingan pemasaran digital, peningkatan kualitas layanan, dan akses pembiayaan mikro untuk UMKM.'}
                                {index === 2 && 'Penggunaan kemasan biodegradable serta edukasi pengurangan plastik sekali pakai bagi pelaku usaha.'}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </PublicLayout>
    );
}
