import { DataTable } from '@/components/common/data-table';
import { EmptyState } from '@/components/common/empty-state';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Pagination } from '@/components/common/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import type { EventListResponse, EventOptions } from '@/types/admin';
import type { PaginationLink } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CalendarPlus, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

interface EventIndexPageProps {
    filters: {
        search?: string;
        status?: string;
        type?: string;
    };
    collection: EventListResponse;
    options: EventOptions;
}

const statusStyles: Record<string, string> = {
    draft: 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-200',
    scheduled: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    published: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    completed: 'bg-sky-500/10 text-sky-600 dark:text-sky-300',
    cancelled: 'bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function EventIndexPage({
    filters,
    collection,
    options,
}: EventIndexPageProps) {
    const page = usePage();
    const currentUrl = page.url;

    const [searchTerm, setSearchTerm] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const [type, setType] = useState(filters.type ?? 'all');

    const links = useMemo(
        () => collection.links as PaginationLink[],
        [collection.links],
    );

    const applyFilters = () => {
        router.get(
            route('admin.events.index'),
            {
                search: searchTerm || undefined,
                status: status !== 'all' ? status : undefined,
                type: type !== 'all' ? type : undefined,
            },
            { preserveState: true, replace: currentUrl !== '/admin/events' },
        );
    };

    const resetFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setType('all');
        router.get(route('admin.events.index'));
    };

    return (
        <>
            <Head title="Event Komunitas" />
            <AdminLayout
                title="Event Komunitas"
                subtitle="Kelola agenda komunitas, edukasi, dan festival pendukung Waduk Manduk."
                actions={
                    <Button asChild>
                        <Link href={route('admin.events.create')}>
                            <CalendarPlus className="mr-2 size-4" />
                            Event Baru
                        </Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <PageHeader
                        title="Daftar Event"
                        subtitle="Jadwalkan event secara rapi agar pengunjung dapat merencanakan kunjungan."
                    />

                    <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <Label htmlFor="search">Cari event</Label>
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Judul atau ringkasan event..."
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select value={status} onValueChange={(value) => setStatus(value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Semua status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua status</SelectItem>
                                    {options.status.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Jenis event</Label>
                            <Select value={type} onValueChange={(value) => setType(value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Semua jenis" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua jenis</SelectItem>
                                    {options.types.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="lg:col-span-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={resetFilters}>
                                Reset
                            </Button>
                            <Button onClick={applyFilters}>
                                <Filter className="mr-2 size-4" />
                                Terapkan
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <DataTable
                            data={collection.data}
                            columns={[
                                {
                                    key: 'title',
                                    header: 'Event',
                                    render: (event) => (
                                        <div className="flex flex-col">
                                            <Link
                                                href={route('admin.events.edit', event.id)}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {event.title}
                                            </Link>
                                            <span className="text-xs text-muted-foreground">
                                                {event.author ?? 'Tanpa penulis'}
                                            </span>
                                        </div>
                                    ),
                                },
                                {
                                    key: 'status',
                                    header: 'Status',
                                    className: 'w-32',
                                    render: (event) => (
                                        <Badge
                                            variant="secondary"
                                            className={statusStyles[event.status] ?? ''}
                                        >
                                            {event.status}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'start_at',
                                    header: 'Mulai',
                                    className: 'w-40',
                                    render: (event) => (
                                        <span className="text-sm text-muted-foreground">
                                            {event.start_at
                                                ? new Date(event.start_at).toLocaleString(
                                                      'id-ID',
                                                      {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                      },
                                                  )
                                                : 'TBA'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'event_type',
                                    header: 'Jenis',
                                    className: 'w-32',
                                    render: (event) => (
                                        <span className="text-sm text-muted-foreground">
                                            {event.event_type ?? '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'organizer',
                                    header: 'Penyelenggara',
                                    className: 'w-40',
                                    render: (event) => (
                                        <span className="text-sm text-muted-foreground">
                                            {event.organizer ?? '-'}
                                        </span>
                                    ),
                                },
                            ]}
                            keySelector={(event) => event.id}
                            emptyContent={
                                <EmptyState
                                    title="Belum ada event"
                                    description="Event komunitas membantu meningkatkan interaksi pengunjung dan warga. Tambahkan event baru sekarang."
                                    actionLabel="Buat event"
                                    onAction={() => router.visit(route('admin.events.create'))}
                                />
                            }
                        />
                        <Pagination links={links} />
                    </div>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

