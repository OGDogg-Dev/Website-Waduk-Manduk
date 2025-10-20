import { Hero } from '@/components/public/hero';
import { StatusBanner } from '@/components/public/status-banner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/public/public-layout';
import type { StatusResource } from '@/types/public';
import { Head } from '@inertiajs/react';

interface AboutPageProps {
    metrics: {
        spots: number;
        umkm: number;
        events: number;
        stories: number;
    };
    latestStatus: Array<Pick<StatusResource, 'crowd_level' | 'weather_summary' | 'reported_at' | 'advisory'>>;
}

export default function AboutPage({ metrics, latestStatus }: AboutPageProps) {
    const items = [
        { label: 'Spot terkelola', value: metrics.spots },
        { label: 'UMKM mitra', value: metrics.umkm },
        { label: 'Event komunitas', value: metrics.events },
        { label: 'Cerita diterbitkan', value: metrics.stories },
    ];

    return (
        <>
            <Head title="Tentang & Kontak" />
            <PublicLayout
                hero={
                    <Hero
                        title="Tentang Ekowisata Waduk Manduk"
                        subtitle="Inisiatif kolaboratif warga desa, relawan, dan pemerintah desa untuk menjaga waduk sekaligus membuka ruang belajar."
                    />
                }
            >
                <div className="space-y-12">
                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {items.map((item) => (
                            <Card key={item.label} className="border-border/80">
                                <CardHeader>
                                    <CardTitle className="text-3xl font-semibold text-foreground">
                                        {item.value}
                                    </CardTitle>
                                    <CardDescription>{item.label}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>

                    {latestStatus.length > 0 && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold tracking-tight text-foreground">
                                Status Terkini
                            </h2>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {latestStatus.map((status, index) => (
                                    <StatusBanner
                                        key={`status-${index}`}
                                        crowd_level={status.crowd_level}
                                        weather_summary={status.weather_summary}
                                        advisory={status.advisory}
                                        startLabel={status.reported_at ? `Dilaporkan ${new Date(status.reported_at).toLocaleDateString('id-ID')}` : 'Dilaporkan'}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                            Kontak & Media Sosial
                        </h2>
                        <div className="rounded-2xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">Pengelola: Komunitas Sahabat Manduk</p>
                            <p>Email: halo@wadukmanduk.id</p>
                            <p>Whatsapp Center: 0813-1122-3344</p>
                            <p>Instagram: @wadukmanduk</p>
                            <p className="mt-4 text-xs">
                                Informasi pengaduan dan saran dapat dikirimkan ke email resmi atau melalui posko pengunjung.
                            </p>
                        </div>
                    </section>
                </div>
            </PublicLayout>
        </>
    );
}
