import { EmptyState } from '@/components/common/empty-state';
import { PageContainer } from '@/components/common/page-container';
import { PageHeader } from '@/components/common/page-header';
import { StatCard } from '@/components/common/stat-card';
import { AdminLayout } from '@/layouts/admin/admin-layout';
import type { DashboardMetrics } from '@/types/admin';
import { Head } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    Map,
    Store,
    UsersRound,
} from 'lucide-react';

interface DashboardPageProps {
    metrics: DashboardMetrics;
}

const formatter = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
});

export default function DashboardPage({ metrics }: DashboardPageProps) {
    const current = metrics.currentStatus;

    return (
        <>
            <Head title="Dashboard" />
            <AdminLayout title="Dashboard" subtitle="Ringkasan singkat ekosistem konten dan aktivitas Waduk Manduk">
                <PageContainer className="px-0">
                    <PageHeader
                        title="Halo, selamat datang kembali!"
                        subtitle="Pantau status lokasi, konten terbaru, dan event komunitas dalam satu tempat."
                    />
                    <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Spot & Peta"
                            value={metrics.counts.spots}
                            helperText="Titik lokasi terpublikasi"
                            icon={Map}
                        />
                        <StatCard
                            label="UMKM Aktif"
                            value={metrics.counts.umkms}
                            helperText="Direktori UMKM yang tampil di laman publik"
                            icon={Store}
                        />
                        <StatCard
                            label="Event Komunitas"
                            value={metrics.counts.events}
                            helperText="Event terjadwal & terpublikasi"
                            icon={Calendar}
                        />
                        <StatCard
                            label="Cerita Terbit"
                            value={metrics.counts.stories}
                            helperText="Story, galeri, dan UGC yang sudah tayang"
                            icon={BookOpen}
                        />
                    </section>

                    <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
                        <div className="space-y-6">
                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Cerita Terbaru
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Story dan galeri terbaru yang sudah terbit.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {metrics.recentStories.length === 0 ? (
                                        <EmptyState
                                            title="Belum ada cerita"
                                            description="Terbitkan cerita atau galeri baru agar pengunjung selalu mendapatkan update terkini."
                                        />
                                    ) : (
                                        metrics.recentStories.map((story) => (
                                            <article
                                                key={story.id}
                                                className="rounded-lg border border-border/80 bg-background/80 px-4 py-3 shadow-sm"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            {story.title}
                                                        </p>
                                                        <p className="text-xs uppercase tracking-wide text-primary">
                                                            {story.status}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {story.published_at
                                                            ? formatter.format(
                                                                  new Date(
                                                                      story.published_at,
                                                                  ),
                                                              )
                                                            : 'Belum terjadwal'}
                                                    </span>
                                                </div>
                                            </article>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Event Komunitas
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            Agenda terdekat yang akan berlangsung di Waduk Manduk.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {metrics.upcomingEvents.length === 0 ? (
                                        <EmptyState
                                            title="Belum ada event terjadwal"
                                            description="Tambahkan event komunitas untuk mengundang partisipasi warga dan pengunjung."
                                            icon={<Calendar className="size-8" />}
                                        />
                                    ) : (
                                        metrics.upcomingEvents.map((event) => (
                                            <article
                                                key={event.id}
                                                className="rounded-lg border border-border/80 bg-background/80 px-4 py-3 shadow-sm"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="font-medium text-foreground">
                                                            {event.title}
                                                        </p>
                                                        <p className="text-xs uppercase tracking-wide text-primary">
                                                            {event.status}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {event.start_at
                                                            ? formatter.format(
                                                                  new Date(event.start_at),
                                                              )
                                                            : 'TBA'}
                                                    </span>
                                                </div>
                                            </article>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <aside className="space-y-6">
                            <div className="rounded-xl border border-border bg-gradient-to-b from-primary/10 via-card to-card p-6 shadow-sm">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-primary">
                                            Status Lokasi
                                        </p>
                                        <h3 className="mt-2 text-xl font-semibold text-foreground">
                                            {current
                                                ? current.crowd_level.toUpperCase()
                                                : 'Belum ada data'}
                                        </h3>
                                    </div>
                                </div>
                                {current ? (
                                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                                        {current.weather_summary && (
                                            <p>
                                                Cuaca: {current.weather_summary} •{' '}
                                                {current.temperature}
                                            </p>
                                        )}
                                        <p>
                                            {current.is_raining
                                                ? 'Sedang ada hujan ringan.'
                                                : 'Tidak ada hujan terpantau.'}
                                        </p>
                                        <p className="text-xs">
                                            Dilaporkan:{' '}
                                            {current.reported_at
                                                ? formatter.format(
                                                      new Date(current.reported_at),
                                                  )
                                                : '-'}
                                        </p>
                                        <p className="text-xs">
                                            Berlaku hingga:{' '}
                                            {current.valid_until
                                                ? formatter.format(
                                                      new Date(current.valid_until),
                                                  )
                                                : 'Perlu update'}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        Belum ada laporan status lokasi. Segera tambahkan
                                        update terbaru agar pengunjung mendapatkan informasi
                                        akurat.
                                    </p>
                                )}
                            </div>

                            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                                <p className="text-sm font-medium text-foreground">
                                    Kontributor aktif
                                </p>
                                <p className="mt-2 text-3xl font-semibold text-foreground">
                                    {metrics.counts.contributors}
                                </p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Peran admin, editor, dan kontributor yang memiliki akses ke
                                    dashboard.
                                </p>
                                <div className="mt-4 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 text-xs text-primary">
                                    Terus dorong warga komunitas untuk mengirimkan cerita dan
                                    dokumentasi agar konten selalu segar.
                                </div>
                            </div>
                        </aside>
                    </section>
                </PageContainer>
            </AdminLayout>
        </>
    );
}

