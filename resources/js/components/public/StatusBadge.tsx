import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle2, CircleSlash2 } from 'lucide-react';
import type { ReactNode } from 'react';

export type StatusBadgeVariant = 'normal' | 'tutup' | 'hati2';

interface StatusBadgeProps {
    variant: StatusBadgeVariant;
    label?: string;
    description?: ReactNode;
    className?: string;
}

const variantStyles: Record<StatusBadgeVariant, { icon: ReactNode; className: string; label: string }> = {
    normal: {
        icon: <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />,
        className: 'bg-emerald-100 text-emerald-900',
        label: 'Normal',
    },
    tutup: {
        icon: <CircleSlash2 className="h-4 w-4 text-rose-600" aria-hidden />,
        className: 'bg-rose-100 text-rose-900',
        label: 'Ditutup sementara',
    },
    hati2: {
        icon: <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden />,
        className: 'bg-amber-100 text-amber-900',
        label: 'Hati-hati',
    },
};

export function StatusBadge({ variant, label, description, className }: StatusBadgeProps) {
    const styles = variantStyles[variant];

    return (
        <span
            className={cn(
                'focus-ring inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold',
                styles.className,
                className,
            )}
        >
            {styles.icon}
            <span>{label ?? styles.label}</span>
            {description && <span className="text-sm font-normal text-inherit">{description}</span>}
        </span>
    );
}
