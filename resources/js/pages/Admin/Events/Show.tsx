import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CalendarClock, Link2 } from 'lucide-react';

interface EventShowPageProps {
    event: {
        id: number;
        title: string;
        slug: string | null;
        tagline: string | null;
        summary: string | null;
        body: string | null;
        location: string | null;
        status: string;
        is_featured: boolean;
        start_at: string | null;
        end_at: string | null;
        published_at: string | null;
        event_type: string | null;
        organizer: string | null;
        contact_person: string | null;
        registration_url: string | null;
        cover_image: string | null;
        gallery: string[] | null;
        metadata: Record<string, unknown> | null;
        created_at: string | null;
        updated_at: string | null;
    };
}

const formatDateTime = (value: string | null) =>
    value
        ? new Date(value).toLocaleString('id-ID', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
          })
        : '-';

export default function EventShowPage({ event }: EventShowPageProps) {
    return (
        <>
            <Head title={event.title} />
            <AdminLayout
                title="Detail Event"
                subtitle="Tinjau detail event sebelum dipublikasikan ke halaman publik."
                breadcrumbs={[
                    { label: 'Dashboard', href: route('admin.dashboard') },
                    { label: 'Event Komunitas', href: route('admin.events.index') },
                    { label: event.title, href: null },
                ]}
                actions={
                    <Button asChild variant="outline">
                        <Link href={route('admin.events.edit', event.id)}>Edit Event</Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <Button variant="ghost" asChild className="mb-4">
                        <Link href={route('admin.events.index')}>
                            <ArrowLeft className="mr-2 size-4" />
                            Kembali
                        </Link>
                    </Button>

                    <PageHeader
                        title={event.title}
                        subtitle={event.tagline ?? 'Agenda komunitas Waduk Manduk'}
                    />

                    <section className="mt-6 space-y-6 rounded-xl border border-border bg-card p-6">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary">{event.status}</Badge>
                            {event.event_type && (
                                <Badge variant="outline">{event.event_type}</Badge>
                            )}
                            {event.is_featured && <Badge variant="default">Sorotan</Badge>}
                        </div>

                        {event.summary && (
                            <p className="text-sm text-muted-foreground">{event.summary}</p>
                        )}

                        {event.body && (
                            <article className="prose max-w-none text-sm leading-relaxed dark:prose-invert">
                                <p>{event.body}</p>
                            </article>
                        )}

                        <dl className="grid gap-4 text-sm md:grid-cols-2">
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Mulai
                                </dt>
                                <dd className="mt-1">{formatDateTime(event.start_at)}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Selesai
                                </dt>
                                <dd className="mt-1">{formatDateTime(event.end_at)}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Lokasi
                                </dt>
                                <dd className="mt-1">{event.location ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Publikasi
                                </dt>
                                <dd className="mt-1">{formatDateTime(event.published_at)}</dd>
                            </div>
                        </dl>

                        <dl className="grid gap-4 text-sm md:grid-cols-2">
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Penyelenggara
                                </dt>
                                <dd className="mt-1">{event.organizer ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Kontak narahubung
                                </dt>
                                <dd className="mt-1">{event.contact_person ?? '-'}</dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Link pendaftaran
                                </dt>
                                <dd className="mt-1">
                                    {event.registration_url ? (
                                        <a
                                            href={event.registration_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-primary hover:underline"
                                        >
                                            <Link2 className="size-4" />
                                            {event.registration_url}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="font-medium text-muted-foreground">
                                    Cover image
                                </dt>
                                <dd className="mt-1">
                                    {event.cover_image ? (
                                        <a
                                            href={event.cover_image}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {event.cover_image}
                                        </a>
                                    ) : (
                                        '-'
                                    )}
                                </dd>
                            </div>
                        </dl>

                        {event.gallery && event.gallery.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Galeri
                                </h3>
                                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    {event.gallery.map((item, index) => (
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

                        {event.metadata && (
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Metadata
                                </h3>
                                <pre className="mt-2 max-h-60 overflow-auto rounded-lg bg-muted/60 p-4 text-xs">
                                    {JSON.stringify(event.metadata, null, 2)}
                                </pre>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1 text-primary">
                                <CalendarClock className="size-4" />
                                Dibuat: {formatDateTime(event.created_at)}
                            </span>
                            <span>Diupdate: {formatDateTime(event.updated_at)}</span>
                        </div>
                    </section>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

