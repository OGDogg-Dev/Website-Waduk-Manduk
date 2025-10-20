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
import type { StoryListResponse, StoryOptions } from '@/types/admin';
import type { PaginationLink } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookPlus, Filter } from 'lucide-react';
import { useMemo, useState } from 'react';

interface StoryIndexPageProps {
    filters: {
        search?: string;
        status?: string;
        type?: string;
    };
    collection: StoryListResponse;
    options: StoryOptions;
}

const statusStyles: Record<string, string> = {
    draft: 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-200',
    review: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    published: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    archived: 'bg-neutral-500/20 text-neutral-500 dark:text-neutral-300',
};

export default function StoryIndexPage({
    filters,
    collection,
    options,
}: StoryIndexPageProps) {
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
            route('admin.stories.index'),
            {
                search: searchTerm || undefined,
                status: status !== 'all' ? status : undefined,
                type: type !== 'all' ? type : undefined,
            },
            { preserveState: true, replace: currentUrl !== '/admin/stories' },
        );
    };

    const resetFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setType('all');
        router.get(route('admin.stories.index'));
    };

    return (
        <>
            <Head title="Berita & Cerita" />
            <AdminLayout
                title="Berita & Cerita"
                subtitle="Kurasi blog, galeri, dan konten UGC seputar Waduk Manduk."
                actions={
                    <Button asChild>
                        <Link href={route('admin.stories.create')}>
                            <BookPlus className="mr-2 size-4" />
                            Cerita Baru
                        </Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <PageHeader
                        title="Daftar Cerita"
                        subtitle="Moderasi konten sebelum ditayangkan agar sejalan dengan nilai ekowisata."
                    />

                    <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <Label htmlFor="search">Cari cerita</Label>
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Judul atau ringkasan..."
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
                            <Label>Jenis</Label>
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
                                    header: 'Judul',
                                    render: (story) => (
                                        <div className="flex flex-col">
                                            <Link
                                                href={route('admin.stories.edit', story.id)}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {story.title}
                                            </Link>
                                            <span className="text-xs text-muted-foreground">
                                                {story.author ?? 'Tanpa penulis'}
                                            </span>
                                        </div>
                                    ),
                                },
                                {
                                    key: 'status',
                                    header: 'Status',
                                    className: 'w-32',
                                    render: (story) => (
                                        <Badge
                                            variant="secondary"
                                            className={statusStyles[story.status] ?? ''}
                                        >
                                            {story.status}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'type',
                                    header: 'Jenis',
                                    className: 'w-32',
                                    render: (story) => (
                                        <span className="text-sm text-muted-foreground">
                                            {story.type}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'published_at',
                                    header: 'Publish',
                                    className: 'w-40',
                                    render: (story) => (
                                        <span className="text-sm text-muted-foreground">
                                            {story.published_at
                                                ? new Date(story.published_at).toLocaleDateString(
                                                      'id-ID',
                                                      {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : 'Menunggu'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'updated_at',
                                    header: 'Update',
                                    className: 'w-40',
                                    render: (story) => (
                                        <span className="text-sm text-muted-foreground">
                                            {story.updated_at
                                                ? new Date(story.updated_at).toLocaleDateString(
                                                      'id-ID',
                                                      {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          year: 'numeric',
                                                      },
                                                  )
                                                : '-'}
                                        </span>
                                    ),
                                },
                            ]}
                            keySelector={(story) => story.id}
                            emptyContent={
                                <EmptyState
                                    title="Belum ada cerita"
                                    description="Mulai dokumentasikan cerita warga, event, atau galeri foto untuk menarik pengunjung."
                                    actionLabel="Tambah cerita"
                                    onAction={() => router.visit(route('admin.stories.create'))}
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

