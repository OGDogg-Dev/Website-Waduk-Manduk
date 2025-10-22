import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface StepProps {
    number: number;
    title: string;
    description: ReactNode;
    className?: string;
    tone?: 'light' | 'dark';
}

export function Step({ number, title, description, className, tone = 'light' }: StepProps) {
    const isDark = tone === 'dark';

    return (
        <div
            className={cn(
                'flex gap-4 rounded-2xl p-5 shadow-soft',
                isDark ? 'border border-white/15 bg-white/6 backdrop-blur' : 'border border-surface-3/70 bg-surface-0',
                className,
            )}
        >
            <span
                className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold',
                    isDark ? 'bg-white/10 text-white' : 'bg-brand-900 text-on-dark',
                )}
            >
                {number}
            </span>
            <div className="space-y-2">
                <h3 className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-text-primary')}>{title}</h3>
                <p className={cn('text-sm', isDark ? 'text-brand-100/80' : 'text-text-secondary')}>{description}</p>
            </div>
        </div>
    );
}
