import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

export interface FaqItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FaqItem[];
    className?: string;
    tone?: 'light' | 'dark';
}

export function FAQ({ items, className, tone = 'light' }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const isDark = tone === 'dark';
    const baseId = useId();

    return (
        <div className={cn('space-y-3', className)}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `${baseId}-panel-${index}`;
                return (
                    <div
                        key={item.question}
                        className={cn(
                            'rounded-2xl shadow-soft',
                            isDark ? 'border border-white/15 bg-white/6 backdrop-blur' : 'border border-surface-3/70 bg-surface-0',
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault();
                                    setOpenIndex(isOpen ? null : index);
                                }
                            }}
                            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            <span className={cn('text-sm font-semibold', isDark ? 'text-white' : 'text-text-primary')}>
                                {item.question}
                            </span>
                            <span
                                aria-hidden
                                className={cn('text-xl font-semibold', isDark ? 'text-accent-100' : 'text-accent-500')}
                            >
                                {isOpen ? '−' : '+'}
                            </span>
                        </button>
                        <div
                            id={panelId}
                            role="region"
                            hidden={!isOpen}
                            className={cn('px-5 pb-5 text-sm', isDark ? 'text-brand-100/80' : 'text-text-secondary')}
                        >
                            {item.answer}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
