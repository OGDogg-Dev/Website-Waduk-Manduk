import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 280);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <button
            type="button"
            className={`back-to-top focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-brand-900/90 text-white shadow-soft transition hover:border-white/40 hover:bg-brand-900 ${visible ? 'visible' : ''}`}
            aria-label="Kembali ke atas"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <ArrowUp className="h-5 w-5" aria-hidden />
        </button>
    );
}
