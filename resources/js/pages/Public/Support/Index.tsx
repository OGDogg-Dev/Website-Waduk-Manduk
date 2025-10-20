import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { StoryCard } from '@/components/public/cards/story-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function SupportPage({ supportChannels, stories }: SupportPageProps) {
    return (
        <>
            <Head title="Dukungan" />
            <PublicLayout
                hero={
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Dukung Ekowisata Waduk Manduk"
                            subtitle="Kontribusi Anda membantu pemberdayaan warga, perawatan fasilitas publik, dan keberlanjutan konservasi."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-12">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {supportChannels.map((channel) => (
                                <Card key={channel.title} className="h-full overflow-hidden rounded-3xl border border-deep-navy/10 bg-foam shadow-reef/10">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-deep-navy">
                                            {channel.title}
                                        </CardTitle>
                                        <CardDescription className="text-sm text-deep-navy/70">{channel.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 text-sm text-deep-navy/70">
                                        {channel.qrisImage && (
                                            <img
                                                src={channel.qrisImage}
                                                alt={`QRIS ${channel.title}`}
                                                className="w-full rounded-2xl border border-dashed border-deep-navy/20"
                                            />
                                        )}
                                        {channel.account && (
                                            <div className="rounded-2xl border border-deep-navy/15 bg-white p-4 text-deep-navy">
                                                <p className="text-sm font-semibold">{channel.account.bank}</p>
                                                <p>No. Rekening: {channel.account.number}</p>
                                                <p>a.n {channel.account.name}</p>
                                            </div>
                                        )}
                                        {channel.contact && <p>Kontak: {channel.contact}</p>}
                                        {channel.email && <p>Email: {channel.email}</p>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="space-y-6 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Dampak Dukungan</p>
                            <h2 className="text-3xl font-semibold md:text-4xl">Cerita perubahan dari kontribusi Anda</h2>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {stories.map((story) => (
                                    <StoryCard key={story.id} {...story} />
                                ))}
                            </div>
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
