import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const prefersDark = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();
    const [isMounted, setIsMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) {
            return;
        }

        if (appearance === 'system') {
            setIsDark(prefersDark());
        } else {
            setIsDark(appearance === 'dark');
        }
    }, [appearance, isMounted]);

    const nextAppearance = useMemo(
        () => (isDark ? 'light' : 'dark'),
        [isDark],
    );

    const iconClass = 'size-5 transition-all duration-200';

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => updateAppearance(nextAppearance)}
            aria-label={`Switch to ${nextAppearance} mode`}
        >
            <Sun
                className={cn(iconClass, isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}
            />
            <Moon
                className={cn(
                    iconClass,
                    'absolute',
                    isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                )}
            />
        </Button>
    );
}

