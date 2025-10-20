import { PageContainer } from '@/components/public/layout/page-container';
import { HeroBanner } from '@/components/public/sections/shared/hero-banner';
import { StatusBanner } from '@/components/public/sections/shared/status-banner';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
                    <PageContainer className="py-24">
                        <HeroBanner
                            title="Tentang Ekowisata Waduk Manduk"
                            subtitle="Inisiatif kolaboratif warga desa, relawan, dan pemerintah desa untuk menjaga waduk sekaligus membuka ruang belajar."
                        />
                    </PageContainer>
                }
            >
                <section className="bg-white py-20">
                    <PageContainer className="space-y-12">
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {items.map((item) => (
                                <Card key={item.label} className="rounded-3xl border border-deep-navy/10 bg-foam p-6 text-deep-navy shadow-reef/10">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-3xl font-semibold">{item.value}</CardTitle>
                                        <CardDescription className="text-sm text-deep-navy/70">{item.label}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>

                        {latestStatus.length > 0 && (
                            <div className="space-y-6">
                                <div className="space-y-2 text-deep-navy">
                                    <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Status Terkini</p>
                                    <h2 className="text-3xl font-semibold md:text-4xl">Update situasi lapangan terbaru</h2>
                                </div>
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {latestStatus.map((status, index) => (
                                        <StatusBanner
                                            key={`status-${index}`}
                                            crowd_level={status.crowd_level}
                                            weather_summary={status.weather_summary}
                                            advisory={status.advisory}
                                            startLabel={
                                                status.reported_at
                                                    ? `Dilaporkan ${new Date(status.reported_at).toLocaleDateString('id-ID')}`
                                                    : 'Dilaporkan'
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 text-deep-navy">
                            <p className="text-sm uppercase tracking-[0.4em] text-[#0f4c81]">Kontak & Media Sosial</p>
                            <div className="rounded-3xl border border-deep-navy/10 bg-foam p-6 text-sm text-deep-navy/70">
                                <p className="font-medium text-deep-navy">Pengelola: Komunitas Sahabat Manduk</p>
                                <p>Email: halo@wadukmanduk.id</p>
                                <p>Whatsapp Center: 0813-1122-3344</p>
                                <p>Instagram: @wadukmanduk</p>
                                <p className="mt-4 text-xs">
                                    Informasi pengaduan dan saran dapat dikirimkan ke email resmi atau melalui posko pengunjung.
                                </p>
                            </div>
                        </div>
                    </PageContainer>
                </section>
            </PublicLayout>
        </>
    );
}
