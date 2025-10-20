import { cn } from '@/lib/utils';

interface FormSectionProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    aside?: React.ReactNode;
    className?: string;
}

export function FormSection({
    title,
    description,
    children,
    aside,
    className,
}: FormSectionProps) {
    return (
        <section
            className={cn(
                'grid gap-6 rounded-xl border border-border bg-card/60 p-6 shadow-sm lg:grid-cols-[1fr_2fr]',
                className,
            )}
        >
            <header className="space-y-2">
                <h2 className="text-lg font-medium text-foreground">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
                {aside}
            </header>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

