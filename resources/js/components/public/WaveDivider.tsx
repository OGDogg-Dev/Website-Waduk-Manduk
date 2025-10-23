import { cn } from '@/lib/utils';

interface WaveDividerProps {
    className?: string;
    flip?: boolean;
    variant?: 'surface' | 'brand' | 'transparent';
}

const variantClassName: Record<Required<WaveDividerProps>['variant'], string> = {
    surface: 'text-surface-0',
    brand: 'text-brand-950',
    transparent: 'text-transparent',
};

export function WaveDivider({ className, flip = false, variant = 'brand' }: WaveDividerProps) {
    return (
        <svg
            className={cn(
                'pointer-events-none block w-full text-brand-950',
                variantClassName[variant],
                flip && 'rotate-180',
                className,
            )}
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
            role="presentation"
            aria-hidden="true"
        >
            <path
                d="M0 120L80 110C160 100 320 80 480 75C640 70 800 80 960 95C1120 110 1280 130 1360 140L1440 150V180H1360C1280 180 1120 180 960 180C800 180 640 180 480 180C320 180 160 180 80 180H0Z"
                fill="currentColor"
            />
        </svg>
    );
}
