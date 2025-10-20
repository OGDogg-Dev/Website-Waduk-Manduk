import { storageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImage?: string | null;
    badgeText?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function Hero({ title, subtitle, backgroundImage, badgeText = 'Ekowisata Waduk Manduk', actions, className }: HeroProps) {
    const background = storageUrl(backgroundImage);

    return (
        <section
            className={cn(
                'relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-background px-6 py-12 md:px-10 md:py-16',
                className,
            )}
        >
            {background && (
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            )}
            <div className="relative z-10 flex flex-col gap-4 md:max-w-2xl">
                {badgeText && (
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {badgeText}
                    </span>
                )}
                <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-base text-muted-foreground md:text-lg">
                        {subtitle}
                    </p>
                )}
                {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
            </div>
        </section>
    );
}
