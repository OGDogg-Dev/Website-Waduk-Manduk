import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone } from 'lucide-react';

interface UmkmShowPageProps {
    umkm: {
        id: number;
        name: string;
        slug: string | null;
        owner_name: string | null;
        category: string | null;
        tagline: string | null;
        description: string | null;
        whatsapp_number: string | null;
        maps_url: string | null;
        instagram_url: string | null;
        facebook_url: string | null;
        status: string;
        is_featured: boolean;
        opening_hours: Record<string, string> | null;
        products: Array<{ name: string; price?: string }> | null;
        address: string | null;
        hero_image: string | null;
        gallery: string[] | null;
        metadata: Record<string, unknown> | null;
    };
}

export default function UmkmShowPage({ umkm }: UmkmShowPageProps) {
    return (
        <>
            <Head title={umkm.name} />
            <AdminLayout
                title="Detail UMKM"
                subtitle="Informasi yang ditampilkan kepada pengunjung di halaman direktori."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'UMKM & Kuliner', href: route('admin.umkm.index') },
                    { label: umkm.name, href: null },
                ]}
                actions={
                    <Button asChild variant="outline">
                        <Link href={route('admin.umkm.edit', umkm.id)}>Edit UMKM</Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.umkm.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>

                    <PageHeader
                        title={umkm.name}
                        subtitle={umkm.tagline ?? 'UMKM Mitra Waduk Manduk'}
                    />

                    <section className="mt-6 space-y-6 rounded-xl border border-border bg-card p-6">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{umkm.status}</Badge>
                            {umkm.category && <Badge variant="outline">{umkm.category}</Badge>}
                            {umkm.is_featured && <Badge variant="default">Sorotan</Badge>}
                        </div>
                        {umkm.description && (
                            <article className="prose max-w-none text-sm leading-relaxed dark:prose-invert">
                                <p>{umkm.description}</p>
                            </article>
                        )}

                        <dl className="grid gap-4 text-sm md:grid-cols-2">
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Pemilik
                                </dt>
                                <dd className="mt-1">{umkm.owner_name ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Nomor WhatsApp
                                </dt>
                                <dd className="mt-1 flex items-center gap-2">
                                    <Phone className="size-4 text-muted-foreground" />
                                    {umkm.whatsapp_number ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Instagram
                                </dt>
                                <dd className="mt-1">
                                    {umkm.instagram_url ? (
                                        <a
                                            href={umkm.instagram_url}
                                            className="text-primary hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {umkm.instagram_url}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Facebook
                                </dt>
                                <dd className="mt-1">
                                    {umkm.facebook_url ? (
                                        <a
                                            href={umkm.facebook_url}
                                            className="text-primary hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {umkm.facebook_url}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                        </dl>

                        {umkm.opening_hours && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Jam operasional
                                </h3>
                                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                                    {Object.entries(umkm.opening_hours).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="font-medium text-foreground">
                                                {key}:
                                            </span>{' '}
                                            {value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {umkm.products && umkm.products.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Produk unggulan
                                </h3>
                                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {umkm.products.map((product, index) => (
                                        <li key={`${product.name}-${index}`}>
                                            <span className="font-medium text-foreground">
                                                {product.name}
                                            </span>{' '}
                                            {product.price && (
                                                <span className="text-muted-foreground">
                                                    • {product.price}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <dl className="grid gap-4 text-sm md:grid-cols-2">
                            <div>
                                <dt className="font-medium text-muted-foreground">Alamat</dt>
                                <dd className="mt-1">{umkm.address ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Google Maps
                                </dt>
                                <dd className="mt-1">
                                    {umkm.maps_url ? (
                                        <a
                                            href={umkm.maps_url}
                                            className="text-primary hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {umkm.maps_url}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                        </dl>

                        {umkm.gallery && umkm.gallery.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Galeri
                                </h3>
                                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {umkm.gallery.map((item, index) => (
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

                        {umkm.metadata && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Metadata
                                </h3>
                                <pre className="mt-2 max-h-56 overflow-auto rounded-lg bg-muted/60 p-4 text-xs">
                                    {JSON.stringify(umkm.metadata, null, 2)}
                                </pre>
                            </div>
                        )}
                    </section>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

