import { PublicFooter } from '@/components/public/layout/public-footer';
import { PublicHeader } from '@/components/public/layout/public-header';

interface PublicLayoutProps {
    hero?: React.ReactNode;
    children: React.ReactNode;
    headerVariant?: 'transparent' | 'solid';
}

export function PublicLayout({ hero, children, headerVariant }: PublicLayoutProps) {
    const variant = headerVariant ?? (hero ? 'transparent' : 'solid');

    return (
        <div className="flex min-h-screen flex-col bg-deep-navy text-white">
            <PublicHeader variant={variant} />
            {hero && <div className="relative isolate">{hero}</div>}
            <main className="flex-1 bg-white text-deep-navy">{children}</main>
            <PublicFooter />
        </div>
    );
}
