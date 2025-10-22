import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StepProps {
    number: number;
    title: string;
    description: ReactNode;
    className?: string;
}

export function Step({ number, title, description, className }: StepProps) {
    return (
        <div className={cn('flex gap-4 rounded-2xl border border-surface-3/70 bg-surface-0 p-5 shadow-soft', className)}>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-900 text-lg font-semibold text-on-dark">
                {number}
            </span>
            <div className="space-y-2">
                <h3 className="text-h5 text-text-primary">{title}</h3>
                <p className="text-sm text-text-secondary">{description}</p>
            </div>
        </div>
    );
}
