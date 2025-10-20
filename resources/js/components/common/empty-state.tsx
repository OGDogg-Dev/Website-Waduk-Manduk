import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
    icon,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            {description && (
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}
            {actionLabel && onAction && (
                <Button className="mt-6" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}

