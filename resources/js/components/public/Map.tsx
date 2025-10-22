import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { cn } from '@/lib/utils';

interface MapMarker {
    position: [number, number];
    title: string;
    description?: string;
}

interface MapProps {
    center: [number, number];
    markers: MapMarker[];
    className?: string;
}

export function Map({ center, markers, className }: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerLayerRef = useRef<any>(null);
    const [shouldInit, setShouldInit] = useState(false);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldInit(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldInit || !mapRef.current || mapInstanceRef.current) {
            return;
        }

        const map = L.map(mapRef.current, {
            scrollWheelZoom: false,
        }).setView(center, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor',
        }).addTo(map);

        const markerLayer = (L as any).layerGroup().addTo(map);
        markerLayerRef.current = markerLayer;

        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        resizeObserver.observe(mapRef.current);

        mapInstanceRef.current = map;

        return () => {
            resizeObserver.disconnect();
            markerLayerRef.current = null;
            mapInstanceRef.current = null;
            map.remove();
        };
    }, [shouldInit, center]);

    useEffect(() => {
        if (!mapInstanceRef.current) {
            return;
        }

        mapInstanceRef.current.setView(center, mapInstanceRef.current.getZoom());
    }, [center]);

    useEffect(() => {
        if (!markerLayerRef.current) {
            return;
        }

        markerLayerRef.current.clearLayers();
        markers.forEach((marker) => {
            const markerInstance = L.marker(marker.position, {
                title: marker.title,
            });
            const popupContent = `<strong>${marker.title}</strong><br/>${marker.description ?? ''}`;
            markerInstance.bindPopup(popupContent);
            markerInstance.addTo(markerLayerRef.current);
        });
    }, [markers]);

    return (
        <div
            ref={containerRef}
            className={cn('relative h-[320px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle,_rgba(12,59,139,0.25),_rgba(4,19,57,0.8))]', className)}
            role="region"
            aria-label="Peta interaktif Waduk Manduk"
        >
            {!shouldInit && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-950/75 text-center text-white">
                    <p className="text-sm font-semibold">Peta interaktif akan dimuat saat Anda mendekat.</p>
                    <p className="max-w-[45ch] text-xs text-white/80">
                        Gunakan tombol berikut untuk membuka rute cadangan bila peta tidak muncul.
                    </p>
                </div>
            )}
            <div ref={mapRef} className="h-full w-full" aria-hidden={!shouldInit} />
            <a
                href="https://maps.google.com/?q=Waduk+Manduk"
                target="_blank"
                rel="noreferrer"
                className="focus-ring absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white hover:border-white/45 hover:bg-white/15"
            >
                Buka di Google Maps
                <span aria-hidden>↗</span>
            </a>
            <span className="sr-only">Tautan "Buka di Google Maps" tersedia bila Anda membutuhkan navigasi alternatif.</span>
        </div>
    );
}
