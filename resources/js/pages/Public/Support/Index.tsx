import { Hero } from '@/components/public/Hero';
import { QuickHelp } from '@/components/public/QuickHelp';
import { StoryCard } from '@/components/public/cards/story-card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StoryResource } from '@/types/public';
import { Head } from '@inertiajs/react';

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

const heroImage = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';

export default function SupportPage({ supportChannels, stories }: SupportPageProps) {
    const quickHelpItems = [
        {
            href: route('support.index', { type: 'donation' }),
            title: 'Saluran donasi',
            description: 'Transfer bank, QRIS, dan dukungan alat konservasi.',
        },
        {
            href: route('support.index', { type: 'volunteer' }),
            title: 'Relawan lapangan',
            description: 'Ikut aksi reresik, monitoring, dan edukasi sekolah.',
        },
        {
            href: route('support.index', { type: 'partnership' }),
            title: 'Kemitraan CSR',
            description: 'Kolaborasi program konservasi dan pemberdayaan UMKM.',
        },
    ];

    return (
        <>
            <Head title="Dukungan" />
            <PublicLayout
                hero={
                    <Hero
                        image={heroImage}
                        alt="Relawan menanam mangrove di Waduk Manduk"
                        eyebrow="Dukungan"
                        title="Kontribusi Anda menjaga Waduk Manduk tetap lestari"
                        subtitle="Setiap donasi, kemitraan, dan jam relawan membantu perawatan fasilitas publik, program literasi bahari, dan penguatan ekonomi warga."
                        actions={[
                            { label: 'Donasi konservasi', href: route('support.index', { type: 'donation' }) },
                            { label: 'Program relawan', href: route('support.index', { type: 'volunteer' }), variant: 'ghost' },
                        ]}
                    />
                }
            >
                <section className="py-12 lg:py-16">
                    <div className="container">
                        <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
                            <div className="space-y-8">
                                <div className="rounded-3xl border border-surface-3/80 bg-surface-0 p-8 shadow-soft">
                                    <h2 className="text-h2 text-text-primary">Saluran dukungan</h2>
                                    <p className="mt-3 text-text-secondary">
                                        Pilih jalur donasi, kemitraan, atau volunteer yang sesuai. Dana dialokasikan transparan untuk konservasi, fasilitas publik, dan literasi warga.
                                    </p>
                                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                        {supportChannels.map((channel) => (
                                            <div
                                                key={channel.title}
                                                className="flex h-full flex-col gap-4 rounded-2xl border border-surface-3/70 bg-surface-1 p-6 shadow-soft"
                                            >
                                                <div>
                                                    <h3 className="text-lg font-semibold text-text-primary">{channel.title}</h3>
                                                    <p className="mt-2 text-sm text-text-secondary">{channel.description}</p>
                                                </div>
                                                {channel.qrisImage && (
                                                    <img
                                                        src={channel.qrisImage}
                                                        alt={`QRIS ${channel.title}`}
                                                        className="w-full rounded-2xl border border-dashed border-surface-3/60"
                                                    />
                                                )}
                                                {channel.account && (
                                                    <div className="rounded-2xl border border-surface-3/80 bg-surface-0 p-4 text-sm text-text-primary">
                                                        <p className="font-semibold">{channel.account.bank}</p>
                                                        <p>No. Rekening: {channel.account.number}</p>
                                                        <p>a.n {channel.account.name}</p>
                                                    </div>
                                                )}
                                                {channel.contact && <p className="text-sm text-text-secondary">Kontak: {channel.contact}</p>}
                                                {channel.email && <p className="text-sm text-text-secondary">Email: {channel.email}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-surface-3/80 bg-surface-1 p-8 shadow-soft">
                                    <h3 className="text-h3 text-text-primary">Pertanggungjawaban & laporan</h3>
                                    <p className="mt-3 text-text-secondary">
                                        Laporan penggunaan dana dan dampak program konservasi dipublikasikan setiap kuartal. Anda dapat mengakses data sensor, progress restorasi, hingga kisah penerima manfaat.
                                    </p>
                                    <a href="mailto:laporan@wadukmanduk.id" className="link focus-ring mt-4 inline-flex items-center gap-2 text-sm">
                                        Minta laporan lengkap →
                                    </a>
                                </div>
                            </div>
                            <QuickHelp
                                items={quickHelpItems}
                                heading="Bantuan cepat"
                                description="Pilihan dukungan populer untuk memulai."
                                className="hidden lg:block"
                            />
                        </div>
                        <QuickHelp
                            items={quickHelpItems}
                            heading="Bantuan cepat"
                            description="Pilihan dukungan populer untuk memulai."
                            className="mt-8 lg:hidden"
                        />
                    </div>
                </section>

                <section className="bg-surface-1 py-12 lg:py-16">
                    <div className="container space-y-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-600">Dampak dukungan</p>
                                <h2 className="text-h2 text-text-primary">Cerita perubahan dari kontribusi Anda</h2>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
