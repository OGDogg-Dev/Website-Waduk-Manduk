import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface FaqItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FaqItem[];
    className?: string;
}

export function FAQ({ items, className }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className={cn('space-y-3', className)}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={item.question} className="rounded-2xl border border-surface-3/70 bg-surface-0 shadow-soft">
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                            aria-expanded={isOpen}
                        >
                            <span className="text-sm font-semibold text-text-primary">{item.question}</span>
                            <span aria-hidden className="text-xl font-semibold text-accent-500">
                                {isOpen ? '−' : '+'}
                            </span>
                        </button>
                        {isOpen && (
                            <div className="px-5 pb-5 text-sm text-text-secondary">{item.answer}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
