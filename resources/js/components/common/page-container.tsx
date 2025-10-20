import { cn } from '@/lib/utils';

interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
    return (
        <div className={cn('mx-auto w-full max-w-7xl px-4 py-6 lg:px-6', className)}>
            {children}
        </div>
    );
}

