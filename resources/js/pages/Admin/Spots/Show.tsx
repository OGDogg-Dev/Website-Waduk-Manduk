import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, MapPin } from 'lucide-react';

interface SpotShowPageProps {
    spot: {
        id: number;
        name: string;
        slug: string | null;
        type: string;
        category: string | null;
        headline: string | null;
        description: string | null;
        tips: string | null;
        latitude: string;
        longitude: string;
        status: string;
        is_featured: boolean;
        sort_order: number;
        hero_image: string | null;
        gallery: string[] | null;
        metadata?: Record<string, unknown> | null;
        updated_at: string | null;
    };
}

export default function SpotShowPage({ spot }: SpotShowPageProps) {
    return (
        <>
            <Head title={spot.name} />
            <AdminLayout
                title="Detail Spot"
                subtitle="Tinjau informasi publik yang tampil di halaman pengunjung."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Spot & Peta', href: route('admin.spots.index') },
                    { label: spot.name, href: null },
                ]}
                actions={
                    <Button asChild variant="outline">
                        <Link href={route('admin.spots.edit', spot.id)}>Edit Spot</Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.spots.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>

                    <PageHeader
                        title={spot.name}
                        subtitle={spot.headline ?? 'Spot Waduk Manduk'}
                    />

                    <section className="mt-6 space-y-6 rounded-xl border border-border bg-card p-6">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline">{spot.type}</Badge>
                            <Badge variant="outline">{spot.status}</Badge>
                            {spot.is_featured && (
                                <Badge variant="default">Sorotan</Badge>
                            )}
                            <span className="inline-flex items-center gap-1">
                                <MapPin className="size-4" /> {spot.latitude},{' '}
                                {spot.longitude}
                            </span>
                        </div>

                        {spot.description && (
                            <article className="prose max-w-none dark:prose-invert">
                                <p>{spot.description}</p>
                            </article>
                        )}

                        {spot.tips && (
                            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-primary">
                                <p className="font-semibold uppercase tracking-wide">
                                    Tips & Etika
                                </p>
                                <p className="mt-2 text-primary/90">{spot.tips}</p>
                            </div>
                        )}

                        <dl className="grid gap-4 text-sm md:grid-cols-2">
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Hero Image
                                </dt>
                                <dd className="mt-1">
                                    {spot.hero_image ? (
                                        <a
                                            href={spot.hero_image}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {spot.hero_image}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Urutan tampil
                                </dt>
                                <dd className="mt-1">{spot.sort_order}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Slug
                                </dt>
                                <dd className="mt-1">{spot.slug ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Kategori
                                </dt>
                                <dd className="mt-1">{spot.category ?? '-'}</dd>
                            </div>
                        </dl>

                        {spot.gallery && spot.gallery.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Galeri
                                </h3>
                                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {spot.gallery.map((item, index) => (
                                        <li key={`${item}-${index}`}>
                                            <a
                                                href={item}
                                                className="text-primary hover:underline"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {spot.metadata && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Metadata
                                </h3>
                                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-muted p-4 text-xs">
                                    {JSON.stringify(spot.metadata, null, 2)}
                                </pre>
                            </div>
                        )}
                    </section>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

