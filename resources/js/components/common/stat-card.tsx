import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: number | string;
    icon?: LucideIcon;
    helperText?: string;
    className?: string;
}

export function StatCard({
    label,
    value,
    icon: Icon,
    helperText,
    className,
}: StatCardProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:border-primary/60 hover:shadow-md',
                className,
            )}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                        {value}
                    </p>
                </div>
                {Icon && (
                    <span className="rounded-full bg-primary/10 p-2 text-primary">
                        <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                )}
            </div>
            {helperText && (
                <p className="mt-3 text-xs text-muted-foreground">
                    {helperText}
                </p>
            )}
        </div>
    );
}

