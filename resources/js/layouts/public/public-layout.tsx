import { PublicFooter } from '@/components/public/layout/public-footer';
import { PublicHeader } from '@/components/public/layout/public-header';
import { FloatingVisitorToolbar } from '@/components/public/layout/floating-visitor-toolbar';

interface PublicLayoutProps {
    hero?: React.ReactNode;
    children: React.ReactNode;
    headerVariant?: 'transparent' | 'solid';
}

export function PublicLayout({ hero, children, headerVariant }: PublicLayoutProps) {
    const variant = headerVariant ?? (hero ? 'transparent' : 'solid');

    return (
        <div className="flex min-h-screen flex-col bg-surface-0 text-text-primary">
            <PublicHeader variant={variant} />
            {hero}
            <main className="flex-1">{children}</main>
            <PublicFooter />
            <FloatingVisitorToolbar />
        </div>
    );
}
