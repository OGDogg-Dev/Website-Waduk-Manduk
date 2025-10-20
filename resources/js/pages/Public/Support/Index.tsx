import { Hero } from '@/components/public/hero';
import { StoryCard } from '@/components/public/story-card';
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
                    <Hero
                        title="Dukung Ekowisata Waduk Manduk"
                        subtitle="Kontribusi Anda membantu pemberdayaan warga, perawatan fasilitas publik, dan keberlanjutan konservasi."
                    />
                }
            >
                <div className="space-y-12">
                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {supportChannels.map((channel) => (
                            <Card key={channel.title} className="h-full border-border/80">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-foreground">
                                        {channel.title}
                                    </CardTitle>
                                    <CardDescription>{channel.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm text-muted-foreground">
                                    {channel.qrisImage && (
                                        <img
                                            src={channel.qrisImage}
                                            alt={`QRIS ${channel.title}`}
                                            className="w-full rounded-lg border border-dashed border-border"
                                        />
                                    )}
                                    {channel.account && (
                                        <div className="rounded-lg border border-border/60 bg-muted/30 p-3">
                                            <p className="font-medium text-foreground">{channel.account.bank}</p>
                                            <p>No. Rekening: {channel.account.number}</p>
                                            <p>a.n {channel.account.name}</p>
                                        </div>
                                    )}
                                    {channel.contact && <p>Kontak: {channel.contact}</p>}
                                    {channel.email && <p>Email: {channel.email}</p>}
                                </CardContent>
                            </Card>
                        ))}
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Dampak Dukungan
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {stories.map((story) => (
                                <StoryCard key={story.id} {...story} />
                            ))}
                        </div>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}
