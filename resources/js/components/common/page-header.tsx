import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    subtitle,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between',
                className,
            )}
        >
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </div>
            {actions && <div className="flex gap-2">{actions}</div>}
        </div>
    );
}

