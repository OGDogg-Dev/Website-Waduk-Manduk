import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface StoryShowPageProps {
    story: {
        id: number;
        title: string;
        slug: string | null;
        type: string;
        status: string;
        hero_image: string | null;
        excerpt: string | null;
        body: string | null;
        tags: string[] | null;
        gallery: string[] | null;
        source_name: string | null;
        source_url: string | null;
        published_at: string | null;
        metadata: Record<string, unknown> | null;
        author?: { name: string | null } | null;
        reviewer?: { name: string | null } | null;
    };
}

const formatDate = (value: string | null) =>
    value
        ? new Date(value).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
          })
        : '-';

export default function StoryShowPage({ story }: StoryShowPageProps) {
    return (
        <>
            <Head title={story.title} />
            <AdminLayout
                title="Detail Cerita"
                subtitle="Konten final yang tampil di halaman 'Berita & Cerita'."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Berita & Cerita', href: route('admin.stories.index') },
                    { label: story.title, href: null },
                ]}
                actions={
                    <Button asChild variant="outline">
                        <Link href={route('admin.stories.edit', story.id)}>Edit Cerita</Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.stories.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>

                    <PageHeader
                        title={story.title}
                        subtitle={story.excerpt ?? 'Konten Waduk Manduk'}
                    />

                    <section className="mt-6 space-y-6 rounded-xl border border-border bg-card p-6">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{story.status}</Badge>
                            <Badge variant="outline">{story.type}</Badge>
                            {story.published_at && (
                                <span className="text-xs">
                                    Terbit: {formatDate(story.published_at)}
                                </span>
                            )}
                        </div>

                        {story.hero_image && (
                            <div className="overflow-hidden rounded-xl border border-border">
                                <img
                                    src={story.hero_image}
                                    alt={story.title}
                                    className="h-64 w-full object-cover"
                                />
                            </div>
                        )}

                        {story.body && (
                            <article className="prose max-w-none text-sm leading-relaxed dark:prose-invert">
                                <p>{story.body}</p>
                            </article>
                        )}

                        {story.tags && story.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {story.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <dl className="grid gap-4 text-sm md:grid-cols-3">
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Penulis
                                </dt>
                                <dd className="mt-1">
                                    {story.author?.name ?? 'Tidak diketahui'}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Reviewer
                                </dt>
                                <dd className="mt-1">
                                    {story.reviewer?.name ?? '-'}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Sumber
                                </dt>
                                <dd className="mt-1">
                                    {story.source_name ?? '-'}
                                    {story.source_url && (
                                        <a
                                            href={story.source_url}
                                            className="ml-2 inline-flex items-center gap-1 text-primary hover:underline"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <ExternalLink className="size-4" />
                                            Kunjungi
                                        </a>
                                    )}
                                </dd>
                            </div>
                        </dl>

                        {story.gallery && story.gallery.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Galeri
                                </h3>
                                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {story.gallery.map((item, index) => (
                                        <li key={`${item}-${index}`}>
                                            <a
                                                href={item}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-primary hover:underline"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {story.metadata && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Metadata
                                </h3>
                                <pre className="mt-2 max-h-56 overflow-auto rounded-lg bg-muted/60 p-4 text-xs">
                                    {JSON.stringify(story.metadata, null, 2)}
                                </pre>
                            </div>
                        )}
                    </section>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

