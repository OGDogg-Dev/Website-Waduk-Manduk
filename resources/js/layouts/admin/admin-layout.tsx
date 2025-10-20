import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Calendar,
    Home,
    Map,
    Menu,
    NotebookText,
    Store,
    Users,
    Waves,
} from 'lucide-react';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

interface AdminLayoutProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: { label: string; href: string | null }[];
    actions?: ReactNode;
    children: ReactNode;
}

type NavItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    match: string;
};

export function AdminLayout({
    title,
    subtitle,
    breadcrumbs = [],
    actions,
    children,
}: AdminLayoutProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const currentUrl = page.url;

    const navItems: NavItem[] = useMemo(
        () => [
            {
                label: 'Dashboard',
                href: route('admin.dashboard'),
                icon: Home,
                match: '/admin',
            },
            {
                label: 'Spot & Peta',
                href: route('admin.spots.index'),
                icon: Map,
                match: '/admin/spots',
            },
            {
                label: 'UMKM & Kuliner',
                href: route('admin.umkm.index'),
                icon: Store,
                match: '/admin/umkm',
            },
            {
                label: 'Event Komunitas',
                href: route('admin.events.index'),
                icon: Calendar,
                match: '/admin/events',
            },
            {
                label: 'Berita & Cerita',
                href: route('admin.stories.index'),
                icon: NotebookText,
                match: '/admin/stories',
            },
            {
                label: 'Status Lokasi',
                href: route('admin.site-statuses.index'),
                icon: Waves,
                match: '/admin/site-statuses',
            },
        ],
        [],
    );

    const renderNav = () => (
        <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => {
                const isActive =
                    currentUrl === item.match ||
                    currentUrl.startsWith(`${item.match}/`);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-primary/10 hover:text-primary',
                            isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground',
                        )}
                    >
                        <item.icon className="size-4 shrink-0" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const HeaderContent = () => (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex items-center gap-3">
                <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                        <div className="flex h-full flex-col">
                            <div className="border-b border-border pb-4">
                                <p className="text-lg font-semibold">
                                    Waduk Manduk Admin
                                </p>
                            </div>
                            <div className="flex flex-1 flex-col gap-6 py-6">
                                {renderNav()}
                                <div className="mt-auto space-y-2 border-t border-border pt-4">
                                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                                        Tema
                                    </p>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="hidden flex-col lg:flex">
                    <p className="text-sm font-semibold tracking-tight text-foreground">
                        {title}
                    </p>
                    {subtitle && (
                        <span className="text-xs text-muted-foreground">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="hidden text-right text-sm lg:block">
                    <p className="font-medium text-foreground">{auth.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                        {auth.user.email}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs uppercase tracking-wide"
                    onClick={handleLogout}
                >
                    Keluar
                </Button>
            </div>
        </header>
    );

    const breadcrumbItems = breadcrumbs.length
        ? breadcrumbs
        : [
              { label: 'Dashboard', href: route('admin.dashboard') },
              { label: title, href: null },
          ];

    return (
        <div className="min-h-screen bg-muted/10 text-foreground lg:flex">
            <aside className="hidden w-64 flex-col border-r border-border bg-background/95 px-4 py-6 lg:flex">
                <div className="pb-6">
                    <Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Users className="size-5 text-primary" />
                        <span>Waduk Manduk Admin</span>
                    </Link>
                </div>
                {renderNav()}
                <div className="mt-auto space-y-2 border-t border-border pt-4">
                    <p className="text-xs font-semibold uppercase text-muted-foreground">
                        Tema
                    </p>
                    <ThemeToggle />
                </div>
            </aside>
            <div className="flex min-h-screen flex-1 flex-col">
                <HeaderContent />
                <main className="flex-1">
                    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
                        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                            {breadcrumbItems.map((item, index) => (
                                <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                                    {item.href ? (
                                        <Link
                                            href={item.href}
                                            className="font-medium text-muted-foreground hover:text-primary"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className="font-medium text-foreground">
                                            {item.label}
                                        </span>
                                    )}
                                    {index < breadcrumbItems.length - 1 && (
                                        <span className="text-muted-foreground">/</span>
                                    )}
                                </span>
                            ))}
                        </div>
                        {actions && (
                            <div className="mb-4 flex items-center justify-end gap-2">
                                {actions}
                            </div>
                        )}
                        <div className="rounded-3xl border border-border/60 bg-background/70 p-6 shadow-sm">
                            <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:hidden">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="mt-1 text-sm text-muted-foreground lg:hidden">
                                    {subtitle}
                                </p>
                            )}
                            <div className="mt-4">{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
