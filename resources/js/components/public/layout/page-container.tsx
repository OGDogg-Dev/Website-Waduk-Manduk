import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function PageContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-[1200px] px-6 py-12 sm:px-10 md:px-12 lg:px-14',
                className,
            )}
            {...props}
        />
    );
}
