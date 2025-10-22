import { useState } from 'react';
import { Lightbox } from './Lightbox';

export interface GalleryItem {
    src: string;
    alt: string;
}

interface GalleryProps {
    items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (!items.length) {
        return <p className="text-sm text-text-secondary">Galeri akan tampil setelah konten ditambahkan melalui admin.</p>;
    }

    return (
        <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" data-testid="gallery-grid">
                {items.map((item, index) => (
                    <button
                        key={item.src}
                        type="button"
                        className="focus-ring group relative aspect-square overflow-hidden rounded-2xl border border-surface-3/70 bg-surface-0 shadow-soft"
                        onClick={() => setActiveIndex(index)}
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="sr-only">Buka gambar {item.alt}</span>
                    </button>
                ))}
            </div>
            {activeIndex !== null && (
                <Lightbox
                    open={activeIndex !== null}
                    onClose={() => setActiveIndex(null)}
                    image={items[activeIndex].src}
                    alt={items[activeIndex].alt}
                />
            )}
        </>
    );
}
