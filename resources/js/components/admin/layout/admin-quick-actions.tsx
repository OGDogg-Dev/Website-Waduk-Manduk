import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    BookOpenCheck,
    CalendarPlus,
    LifeBuoy,
    MapPinPlus,
    Plus,
    Store,
} from 'lucide-react';

interface QuickAction {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description: string;
    href: string;
}

const quickActions: QuickAction[] = [
    {
        icon: BookOpenCheck,
        label: 'Cerita & artikel',
        description: 'Bagikan update terbaru ke halaman publik',
        href: route('admin.stories.create'),
    },
    {
        icon: CalendarPlus,
        label: 'Event komunitas',
        description: 'Jadwalkan aktivitas warga & wisatawan',
        href: route('admin.events.create'),
    },
    {
        icon: MapPinPlus,
        label: 'Spot & peta',
        description: 'Tambah titik daya tarik baru beserta fasilitas',
        href: route('admin.spots.create'),
    },
    {
        icon: Store,
        label: 'UMKM mitra',
        description: 'Kurasi tenant kuliner & produk lokal',
        href: route('admin.umkm.create'),
    },
];

export function AdminQuickActions({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col gap-3',
                className,
            )}
        >
            <Sheet>
                <div className="pointer-events-auto flex items-center justify-end gap-2">
                    <SheetTrigger asChild>
                        <Button
                            size="lg"
                            className="hidden items-center gap-3 rounded-full bg-primary px-6 text-primary-foreground shadow-[0_16px_45px_-20px_rgba(15,76,129,0.45)] hover:bg-primary/90 lg:flex"
                            aria-label="Buka aksi cepat"
                        >
                            <Plus className="h-5 w-5" aria-hidden />
                            Buat konten
                        </Button>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 lg:hidden"
                            aria-label="Buka aksi cepat"
                        >
                            <Plus className="h-5 w-5" aria-hidden />
                        </Button>
                    </SheetTrigger>
                </div>
                <SheetContent
                    side="bottom"
                    className="pointer-events-auto h-auto w-full max-h-[85vh] rounded-t-3xl border border-border/50 bg-background/95 px-6 pb-8 pt-6 shadow-2xl sm:left-auto sm:bottom-6 sm:right-6 sm:h-auto sm:w-[420px] sm:rounded-3xl"
                >
                    <div className="mx-auto w-full max-w-md">
                        <div className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                                Aksi cepat
                            </p>
                            <h2 className="mt-2 text-xl font-semibold text-foreground">
                                Pilih jenis konten yang ingin dibuat
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Fokus pada informasi prioritas agar pengunjung selalu mendapatkan kabar terbaru.
                            </p>
                        </div>
                        <Separator className="my-5" />
                        <div className="grid gap-3">
                            {quickActions.map((action) => {
                                const Icon = action.icon;

                                return (
                                    <Button
                                        key={action.href}
                                        variant="outline"
                                        className="group justify-start gap-3 rounded-2xl border-dashed border-border/60 bg-card/80 py-4 text-left text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                                        asChild
                                    >
                                        <Link href={action.href}>
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                <Icon className="h-5 w-5" aria-hidden />
                                            </span>
                                            <span className="flex flex-col">
                                                <span className="text-sm font-semibold">{action.label}</span>
                                                <span className="text-xs text-muted-foreground">{action.description}</span>
                                            </span>
                                        </Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition hover:border-primary/50 hover:bg-primary/15"
            >
                <LifeBuoy className="h-4 w-4" aria-hidden />
                Dukungan editor
            </a>
        </div>
    );
}
