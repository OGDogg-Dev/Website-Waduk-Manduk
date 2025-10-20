import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PaginationLink } from '@/types/pagination';
import { router } from '@inertiajs/react';

interface PaginationProps {
    links: PaginationLink[];
    className?: string;
}

export function Pagination({ links, className }: PaginationProps) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav
            className={cn(
                'flex flex-wrap items-center justify-between gap-2 pt-4',
                className,
            )}
            aria-label="Pagination"
        >
            <div className="flex flex-1 flex-wrap items-center gap-2">
                {links.map((link, index) => {
                    const label = link.label.replace(/&laquo;|&raquo;/g, '').trim();
                    const isPrev = index === 0;
                    const isNext = index === links.length - 1;

                    if (link.url === null) {
                        return (
                            <Button
                                key={`${label}-${index}`}
                                variant="outline"
                                size="sm"
                                disabled
                                className="min-w-10"
                            >
                                {isPrev ? 'Prev' : isNext ? 'Next' : label}
                            </Button>
                        );
                    }

                    return (
                        <Button
                            key={`${label}-${index}`}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            className={cn('min-w-10', link.active && 'pointer-events-none')}
                            onClick={() => router.visit(link.url!)}
                        >
                            {isPrev ? 'Prev' : isNext ? 'Next' : label}
                        </Button>
                    );
                })}
            </div>
        </nav>
    );
}
