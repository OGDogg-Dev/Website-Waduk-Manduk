import { DataTable } from '@/components/common/data-table';
import { EmptyState } from '@/components/common/empty-state';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { Pagination } from '@/components/common/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import type { SiteStatusListResponse, SiteStatusOptions } from '@/types/admin';
import type { PaginationLink } from '@/types/pagination';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

interface SiteStatusIndexPageProps {
    filters: {
        crowd_level?: string;
        current?: string;
    };
    collection: SiteStatusListResponse;
    options: SiteStatusOptions;
}

export default function SiteStatusIndexPage({
    filters,
    collection,
    options,
}: SiteStatusIndexPageProps) {
    const page = usePage();
    const currentUrl = page.url;

    const [crowdLevel, setCrowdLevel] = useState(filters.crowd_level ?? 'all');
    const [currentOnly, setCurrentOnly] = useState(
        (filters.current ?? '') === 'true',
    );

    const links = useMemo(
        () => collection.links as PaginationLink[],
        [collection.links],
    );

    const applyFilters = (value?: { crowd?: string; current?: boolean }) => {
        const nextCrowd = value?.crowd ?? crowdLevel;
        const nextCurrent = value?.current ?? currentOnly;
        router.get(
            route('admin.site-statuses.index'),
            {
                crowd_level: nextCrowd !== 'all' ? nextCrowd : undefined,
                current: nextCurrent ? 'true' : undefined,
            },
            { preserveState: true, replace: currentUrl !== '/admin/site-statuses' },
        );
    };

    const resetFilters = () => {
        setCrowdLevel('all');
        setCurrentOnly(false);
        router.get(route('admin.site-statuses.index'));
    };

    return (
        <>
            <Head title="Status Lokasi" />
            <AdminLayout
                title="Status Lokasi"
                subtitle="Update kepadatan, cuaca, dan catatan lapangan Waduk Manduk."
                actions={
                    <Button asChild>
                        <Link href={route('admin.site-statuses.create')}>
                            <Plus className="mr-2 size-4" />
                            Laporan Baru
                        </Link>
                    </Button>
                }
            >
                <PageContainer className="px-0">
                    <PageHeader
                        title="Riwayat Status"
                        subtitle="Catatan terbaru akan menjadi referensi utama di beranda publik."
                    />

                    <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-[1fr_auto_auto]">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">
                                Tingkat kepadatan
                            </label>
                            <Select
                                value={crowdLevel}
                                onValueChange={(value) => {
                                    setCrowdLevel(value);
                                    applyFilters({ crowd: value });
                                }}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Semua" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Semua</SelectItem>
                                    {options.crowdLevels.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Checkbox
                                id="filter-current"
                                checked={currentOnly}
                                onCheckedChange={(checked) => {
                                    const next = Boolean(checked);
                                    setCurrentOnly(next);
                                    applyFilters({ current: next });
                                }}
                            />
                            <Label
                                htmlFor="filter-current"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Hanya status aktif
                            </Label>
                        </div>
                        <div className="flex items-end justify-end">
                            <Button variant="outline" onClick={resetFilters}>
                                Reset
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4">
                        <DataTable
                            data={collection.data}
                            columns={[
                                {
                                    key: 'crowd_level',
                                    header: 'Kepadatan',
                                    render: (item) => (
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{item.crowd_level}</Badge>
                                            {item.is_current && (
                                                <Badge variant="default">Aktif</Badge>
                                            )}
                                        </div>
                                    ),
                                },
                                {
                                    key: 'weather_summary',
                                    header: 'Cuaca',
                                    className: 'max-w-sm',
                                    render: (item) => (
                                        <span className="text-sm text-muted-foreground">
                                            {item.weather_summary ?? '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'reported_at',
                                    header: 'Dilaporkan',
                                    className: 'w-40',
                                    render: (item) => (
                                        <span className="text-sm text-muted-foreground">
                                            {item.reported_at
                                                ? new Date(item.reported_at).toLocaleString(
                                                      'id-ID',
                                                      {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                      },
                                                  )
                                                : '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'valid_until',
                                    header: 'Berlaku hingga',
                                    className: 'w-40',
                                    render: (item) => (
                                        <span className="text-sm text-muted-foreground">
                                            {item.valid_until
                                                ? new Date(item.valid_until).toLocaleString(
                                                      'id-ID',
                                                      {
                                                          day: '2-digit',
                                                          month: 'short',
                                                          hour: '2-digit',
                                                          minute: '2-digit',
                                                      },
                                                  )
                                                : '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'reporter',
                                    header: 'Petugas',
                                    className: 'w-40',
                                    render: (item) => (
                                        <span className="text-sm text-muted-foreground">
                                            {item.reporter ?? '-'}
                                        </span>
                                    ),
                                },
                                {
                                    key: 'actions',
                                    header: 'Aksi',
                                    className: 'w-20',
                                    render: (item) => (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="px-0 text-primary"
                                            onClick={() =>
                                                router.visit(
                                                    route('admin.site-statuses.edit', item.id),
                                                )
                                            }
                                        >
                                            Edit
                                        </Button>
                                    ),
                                },
                            ]}
                            keySelector={(item) => item.id}
                            emptyContent={
                                <EmptyState
                                    title="Belum ada laporan status"
                                    description="Tambahkan laporan status agar pengunjung mendapatkan informasi terbaru kondisi waduk."
                                    actionLabel="Buat laporan pertama"
                                    onAction={() =>
                                        router.visit(route('admin.site-statuses.create'))
                                    }
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
