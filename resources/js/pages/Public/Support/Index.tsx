import { Head, Link } from '@inertiajs/react';
import { PageHero } from '@/components/public/sections/shared/page-hero';
import { StoryCard } from '@/components/public/cards/story-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StoryResource } from '@/types/public';

interface SupportChannel {
    title: string;
    description: string;
    qrisImage?: string;
    account?: {
        bank: string;
        number: string;
        name: string;
    };
    contact?: string;
    email?: string;
}

interface SupportPageProps {
    supportChannels: SupportChannel[];
    stories: StoryResource[];
}

export default function SupportPage({ supportChannels, stories }: SupportPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index', { type: 'donation' }),
            title: 'Saluran donasi',
            description: 'Transfer bank, QRIS, dan dukungan alat konservasi untuk operasional harian.',
        },
        {
            href: route('support.index', { type: 'volunteer' }),
            title: 'Daftar relawan',
            description: 'Ikut serta dalam aksi bersih waduk, monitoring ekosistem, dan edukasi sekolah.',
        },
        {
            href: route('support.index', { type: 'partnership' }),
            title: 'Kemitraan CSR',
            description: 'Kolaborasi program konservasi dan pemberdayaan UMKM pesisir.',
        },
    ];

    return (
        <PublicLayout>
            <Head title="Panduan Dukungan">
                <meta
                    name="description"
                    content="Panduan donasi, relawan, dan kemitraan untuk mendukung ekowisata berkelanjutan Waduk Manduk."
                />
                <meta property="og:title" content="Panduan Dukungan Waduk Manduk" />
                <meta
                    property="og:description"
                    content="Pelajari langkah dukungan, saluran donasi, dan kisah dampak dari kontribusi Anda di Waduk Manduk."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href={route('support.index')} />
            </Head>

            <PageHero
                eyebrow="Panduan dukungan"
                title="Panduan & Bantuan"
                description="Semua informasi yang Anda perlukan untuk berdonasi, menjadi relawan, ataupun bermitra dengan pengelola Waduk Manduk."
                quickHelpItems={quickHelpItems}
                quickHelpHeading="Mulai dari sini"
                quickHelpDescription="Pilih jalur dukungan yang sesuai dan hubungi tim kami kapan saja."
                quickHelpCta={{
                    label: 'Hubungi pusat dukungan',
                    href: 'mailto:dukungan@wadukmanduk.id',
                    description: 'dukungan@wadukmanduk.id',
                }}
            />

            <section className="relative overflow-hidden bg-[#041939] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(53,132,228,0.25),_rgba(4,25,57,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">Saluran dukungan</p>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Pilih cara kontribusi terbaik untuk Anda</h2>
                        <p className="max-w-3xl text-brand-100/80">
                            Kami mengelola dana secara transparan untuk perawatan fasilitas, edukasi konservasi, dan pemberdayaan warga pesisir.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {supportChannels.map((channel) => (
                            <article
                                key={channel.title}
                                className="flex h-full flex-col gap-4 rounded-[2rem] border border-white/15 bg-white/8 p-6 shadow-soft backdrop-blur"
                            >
                                <div>
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-brand-100/70">{channel.title}</p>
                                    <p className="mt-3 text-sm text-brand-100/80">{channel.description}</p>
                                </div>
                                {channel.qrisImage && (
                                    <img
                                        src={channel.qrisImage}
                                        alt={`QRIS ${channel.title}`}
                                        className="w-full rounded-[1.6rem] border border-white/15"
                                    />
                                )}
                                {channel.account && (
                                    <div className="rounded-[1.6rem] border border-white/12 bg-white/10 p-4 text-sm text-white">
                                        <p className="font-semibold uppercase tracking-[0.32em] text-xs text-brand-100/80">{channel.account.bank}</p>
                                        <p className="mt-2 font-semibold">{channel.account.number}</p>
                                        <p className="text-sm text-brand-100/80">a.n {channel.account.name}</p>
                                    </div>
                                )}
                                {channel.contact && <p className="text-sm text-brand-100/80">Kontak: {channel.contact}</p>}
                                {channel.email && <p className="text-sm text-brand-100/80">Email: {channel.email}</p>}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#04132d] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-20%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(236,172,72,0.2),_rgba(4,19,45,0))] blur-3xl" aria-hidden />
                <div className="container relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/8 p-8 shadow-soft backdrop-blur">
                        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Langkah dukungan terstruktur</h2>
                        <ol className="space-y-4 text-sm text-brand-100/80">
                            <li>
                                <span className="font-semibold text-white">1. Tentukan jalur dukungan</span>
                                <br />Pilih donasi, relawan, atau kemitraan sesuai kebutuhan komunitas Anda.
                            </li>
                            <li>
                                <span className="font-semibold text-white">2. Hubungi koordinator</span>
                                <br />Tim kami akan membantu menyiapkan proposal kegiatan dan kebutuhan lapangan.
                            </li>
                            <li>
                                <span className="font-semibold text-white">3. Lakukan aksi & evaluasi</span>
                                <br />Dapatkan laporan dampak, dokumentasi kegiatan, dan rekomendasi tindak lanjut.
                            </li>
                        </ol>
                        <Link
                            href="mailto:dukungan@wadukmanduk.id"
                            className="focus-ring inline-flex w-max items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                        >
                            Konsultasi rencana dukungan →
                        </Link>
                    </div>
                    <div className="space-y-6 rounded-[2rem] border border-white/15 bg-white/5 p-8 shadow-soft backdrop-blur">
                        <h3 className="text-2xl font-semibold text-white">Pertanyaan umum</h3>
                        <div className="space-y-4 text-sm text-brand-100/80">
                            <details className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
                                <summary className="cursor-pointer text-sm font-semibold text-white">Bagaimana transparansi penggunaan dana?</summary>
                                <p className="mt-2 text-sm text-brand-100/80">
                                    Laporan keuangan dan capaian program dipublikasikan setiap kuartal melalui email dan kanal resmi komunitas.
                                </p>
                            </details>
                            <details className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
                                <summary className="cursor-pointer text-sm font-semibold text-white">Apakah tersedia program untuk pelajar?</summary>
                                <p className="mt-2 text-sm text-brand-100/80">
                                    Ya, kami menyediakan paket edukasi konservasi dan tur interpretasi khusus pelajar serta universitas.
                                </p>
                            </details>
                            <details className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
                                <summary className="cursor-pointer text-sm font-semibold text-white">Bisakah bermitra jangka panjang?</summary>
                                <p className="mt-2 text-sm text-brand-100/80">
                                    Program kemitraan korporasi dapat dirancang multi-tahun dengan fokus konservasi, UMKM, atau riset.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-[#040f24] py-20 text-white lg:py-24">
                <div className="absolute inset-x-[-25%] top-[-18rem] h-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(73,170,255,0.18),_rgba(4,15,36,0))] blur-3xl" aria-hidden />
                <div className="container relative space-y-10">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-brand-100/80">Cerita dampak</p>
                        <h2 className="text-3xl font-semibold sm:text-4xl">Perubahan nyata dari dukungan Anda</h2>
                        <p className="max-w-3xl text-brand-100/80">
                            Baca laporan singkat dari lapangan mengenai bagaimana kontribusi Anda menghidupkan konservasi Waduk Manduk.
                        </p>
                    </div>
                    {stories.length ? (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-6 text-sm text-brand-100/80">
                            Cerita dampak akan tampil setelah admin mempublikasikan laporan terbaru.
                        </p>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
