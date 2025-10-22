import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
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

    useEffect(() => {
        if (!mapRef.current) {
            return;
        }

        const map = L.map(mapRef.current, {
            scrollWheelZoom: false,
        }).setView(center, 14);

        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> kontributor',
        });
        tileLayer.addTo(map);

        markers.forEach((marker) => {
            const markerInstance = L.marker(marker.position, {
                title: marker.title,
            });
            const popupContent = `<strong>${marker.title}</strong><br/>${marker.description ?? ''}`;
            markerInstance.bindPopup(popupContent);
            markerInstance.addTo(map);
        });

        const observer = new ResizeObserver(() => {
            map.invalidateSize();
        });
        observer.observe(mapRef.current);

        return () => {
            observer.disconnect();
            map.remove();
        };
    }, [center, markers]);

    return <div ref={mapRef} className={cn('h-[320px] w-full overflow-hidden rounded-2xl', className)} aria-label="Peta Waduk Manduk" />;
}
