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
import type { UmkmListResponse, UmkmOptions } from '@/types/admin';
import type { PaginationLink } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Filter, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

interface UmkmIndexPageProps {
    filters: {
        search?: string;
        status?: string;
        category?: string;
        featured?: string;
    };
    collection: UmkmListResponse;
    options: UmkmOptions;
}

const statusStyles: Record<string, string> = {
    draft: 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-200',
    review: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    published: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    archived: 'bg-neutral-500/20 text-neutral-500 dark:text-neutral-300',
};

export default function UmkmIndexPage({
    filters,
    collection,
    options,
}: UmkmIndexPageProps) {
    const page = usePage();
    const currentUrl = page.url;

    const [searchTerm, setSearchTerm] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'all');
    const [category, setCategory] = useState(filters.category ?? 'all');
    const [featured, setFeatured] = useState(filters.featured ?? 'all');

    const links = useMemo(
        () => collection.links as PaginationLink[],
        [collection.links],
    );

    const applyFilters = () => {
        router.get(
            route('admin.umkm.index'),
            {
                search: searchTerm || undefined,
                status: status !== 'all' ? status : undefined,
                category: category !== 'all' ? category : undefined,
                featured: featured !== 'all' ? featured : undefined,
            },
            { preserveState: true, replace: currentUrl !== '/admin/umkm' },
        );
    };

    const resetFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setCategory('all');
        setFeatured('all');
        router.get(route('admin.umkm.index'));
    };

    return (
        <>
            <Head title="UMKM & Kuliner" />
            <AdminLayout
                title="UMKM & Kuliner"
                subtitle="Kurasi UMKM mitra agar pengunjung mengetahui referensi kuliner dan oleh-oleh."
                actions={
                    <Button asChild>
                        <Link href={route('admin.umkm.create')}>
                            <Plus className="mr-2 size-4" />
                            UMKM Baru
                        </Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <PageHeader
                        title="Direktori UMKM"
                        subtitle="Pastikan kontak dan jam operasional UMKM selalu diperbarui."
                    />

                    <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-4">
                        <div className="lg:col-span-2">
                            <Label htmlFor="search">Cari UMKM</Label>
                            <Input
                                id="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Nama UMKM atau tagline..."
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
                            <Label>Kategori</Label>
                            <Select
                                value={category}
                                onValueChange={(value) => setCategory(value)}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Semua kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua kategori</SelectItem>
                                    {options.categories.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="lg:col-span-4 grid grid-cols-2 gap-2">
                            <div>
                                <Label>Sorotan</Label>
                                <Select
                                    value={featured}
                                    onValueChange={(value) => setFeatured(value)}
                                >
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Semua</SelectItem>
                                        <SelectItem value="featured">Sorotan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end justify-end gap-2">
                                <Button variant="outline" onClick={resetFilters}>
                                    Reset
                                </Button>
                                <Button onClick={applyFilters}>
                                    <Filter className="mr-2 size-4" />
                                    Terapkan
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <DataTable
                            data={collection.data}
                            columns={[
                                {
                                    key: 'name',
                                    header: 'UMKM',
                                    render: (umkm) => (
                                        <div className="flex flex-col">
                                            <Link
                                                href={route('admin.umkm.edit', umkm.id)}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {umkm.name}
                                            </Link>
                                            <span className="text-xs text-muted-foreground">
                                                {umkm.category ?? 'Tidak dikategorikan'}
                                            </span>
                                        </div>
                                    ),
                                },
                                {
                                    key: 'status',
                                    header: 'Status',
                                    className: 'w-36',
                                    render: (umkm) => (
                                        <Badge
                                            variant="secondary"
                                            className={statusStyles[umkm.status] ?? ''}
                                        >
                                            {umkm.status}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'is_featured',
                                    header: 'Sorotan',
                                    className: 'w-24',
                                    render: (umkm) => (
                                        <Badge
                                            variant={umkm.is_featured ? 'default' : 'outline'}
                                        >
                                            {umkm.is_featured ? 'Ya' : 'Tidak'}
                                        </Badge>
                                    ),
                                },
                                {
                                    key: 'whatsapp_number',
                                    header: 'Kontak',
                                    className: 'w-40',
                                    render: (umkm) => (
                                        <span className="text-sm text-muted-foreground">
                                            {umkm.whatsapp_number ?? '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'updated_at',
                                    header: 'Update',
                                    className: 'w-40',
                                    render: (umkm) => (
                                        <span className="text-sm text-muted-foreground">
                                            {umkm.updated_at
                                                ? new Date(umkm.updated_at).toLocaleDateString(
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
                            keySelector={(umkm) => umkm.id}
                            emptyContent={
                                <EmptyState
                                    title="Belum ada data UMKM"
                                    description="Tambahkan UMKM agar pengunjung dapat membeli produk langsung dari warga."
                                    actionLabel="Tambah UMKM"
                                    onAction={() => router.visit(route('admin.umkm.create'))}
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

