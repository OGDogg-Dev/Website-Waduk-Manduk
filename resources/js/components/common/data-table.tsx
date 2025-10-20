import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Column<T> = {
    key: keyof T | string;
    header: string;
    className?: string;
    render?: (item: T) => ReactNode;
};

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keySelector?: (item: T, index: number) => React.Key;
    emptyContent?: React.ReactNode;
    className?: string;
}

export function DataTable<T>({
    data,
    columns,
    keySelector,
    emptyContent,
    className,
}: DataTableProps<T>) {
    if (data.length === 0 && emptyContent) {
        return <>{emptyContent}</>;
    }

    return (
        <div className={cn('overflow-hidden rounded-xl border border-border', className)}>
            <table className="min-w-full divide-y divide-border bg-card">
                <thead className="bg-muted/40">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key.toString()}
                                scope="col"
                                className={cn(
                                    'px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground',
                                    column.className,
                                )}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                    {data.map((item, index) => (
                        <tr
                            key={keySelector?.(item, index) ?? index}
                            className="hover:bg-muted/40"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.key.toString()}
                                    className={cn(
                                        'px-4 py-4 align-top text-foreground',
                                        column.className,
                                    )}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : (item as Record<string, ReactNode | string | number | boolean | null | undefined>)[column.key as string] ?? ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
