import { DataTable } from '@/components/common/data-table';
import { EmptyState } from '@/components/common/empty-state';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Pagination } from '@/components/common/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import type { SpotListResponse, SpotOptions } from '@/types/admin';
import type { PaginationLink } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

interface SpotIndexPageProps {
    filters: {
        search?: string;
        status?: string;
        type?: string;
    };
    collection: SpotListResponse;
    options: SpotOptions;
}

const statusStyles: Record<string, string> = {
    draft: 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-200',
    review: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    published: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    archived: 'bg-neutral-500/20 text-neutral-500 dark:text-neutral-300',
};

export default function SpotIndexPage({
    filters,
    collection,
    options,
}: SpotIndexPageProps) {
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
            route('admin.spots.index'),
            {
                search: searchTerm || undefined,
                status: status !== 'all' ? status : undefined,
                type: type !== 'all' ? type : undefined,
            },
            { preserveState: true, replace: currentUrl !== '/admin/spots' },
        );
    };

    const resetFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setType('all');
        router.get(route('admin.spots.index'));
    };

    return (
        <>
            <Head title="Spot & Peta" />
            <AdminLayout
                title="Spot & Peta"
                subtitle="Kelola titik lokasi penting, jalur interpretasi, dan fasilitas Waduk Manduk."
                actions={
                    <Button asChild>
                        <Link href={route('admin.spots.create')}>
                            <Plus className="mr-2 size-4" />
                            Spot Baru
                        </Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <PageHeader
                        title="Daftar Spot"
                        subtitle="Gunakan filter untuk menemukan titik yang ingin Anda perbarui."
                    />

                    <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <Label htmlFor="search">Cari spot</Label>
                            <div className="relative mt-1">
                                <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                                <Input
                                    id="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Nama atau deskripsi spot..."
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Status</Label>
                            <Select
                                value={status}
                                onValueChange={(value) => setStatus(value)}
                            >
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
                                Atur Ulang
                            </Button>
                            <Button onClick={applyFilters}>Terapkan</Button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <DataTable
                            data={collection.data}
                            columns={[
                                {
                                    key: 'name',
                                    header: 'Spot',
                                    render: (spot) => (
                                        <div className="flex flex-col">
                                            <Link
                                                href={route('admin.spots.edit', spot.id)}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {spot.name}
                                            </Link>
                                            <span className="text-xs text-muted-foreground">
                                                {spot.type}
                                            </span>
                                        </div>
                                    ),
                                },
                                {
                                    key: 'status',
                                    header: 'Status',
                                    className: 'w-36',
                                    render: (spot) => (
                                        <Badge
                                            variant="secondary"
                                            className={statusStyles[spot.status] ?? ''}
                                        >
                                            {spot.status}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'is_featured',
                                    header: 'Sorotan',
                                    className: 'w-24',
                                    render: (spot) => (
                                        <Badge
                                            variant={spot.is_featured ? 'default' : 'outline'}
                                        >
                                            {spot.is_featured ? 'Ya' : 'Tidak'}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'sort_order',
                                    header: 'Urutan',
                                    className: 'w-20 text-right',
                                    render: (spot) => (
                                        <span className="text-sm text-muted-foreground">
                                            {spot.sort_order}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'updated_at',
                                    header: 'Terakhir diperbarui',
                                    className: 'w-48',
                                    render: (spot) => (
                                        <span className="text-sm text-muted-foreground">
                                            {spot.updated_at
                                                ? new Date(spot.updated_at).toLocaleString(
                                                      'id-ID',
                                                  )
                                                : '-'}
                                        </span>
                                    ),
                                },
                            ]}
                            keySelector={(spot) => spot.id}
                            emptyContent={
                                <EmptyState
                                    title="Belum ada spot tersimpan"
                                    description="Tambahkan spot baru untuk mengisi peta interaktif di halaman publik."
                                    actionLabel="Buat spot pertama"
                                    onAction={() => router.visit(route('admin.spots.create'))}
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

