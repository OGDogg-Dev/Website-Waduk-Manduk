import { Dialog, DialogPanel } from '@headlessui/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface LightboxProps {
    open: boolean;
    onClose: () => void;
    image: string;
    alt: string;
}

export function Lightbox({ open, onClose, image, alt }: LightboxProps) {
    useEffect(() => {
        function onKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        if (open) {
            window.addEventListener('keydown', onKey);
        }
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-soft">
                    <button
                        type="button"
                        onClick={onClose}
                        className="focus-ring absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                        aria-label="Tutup gambar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img src={image} alt={alt} className="h-full w-full object-contain" loading="lazy" />
                </DialogPanel>
            </div>
        </Dialog>
    );
}
