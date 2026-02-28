"use client";

import { useCallback, useMemo } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import type { DemolitionAnnouncement } from "@/lib/demolition-data";
import { statusLabels, buildingTypeLabels, getTotalEstimatedValue } from "@/lib/demolition-data";
import { formatPrice, cn } from "@/lib/utils";

interface DemolitionMapProps {
    announcements: DemolitionAnnouncement[];
    selectedId: string | null;
    onSelectAnnouncement: (id: string | null) => void;
    className?: string;
}

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const defaultCenter = {
    lat: 47.0245,
    lng: 28.8328,
};

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#d1d5db" }],
        },
        {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{ color: "#f5f5f3" }],
        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#e5e7eb" }],
        },
    ],
};

const statusPinColors: Record<string, string> = {
    planned: "#4B5563",
    "in-progress": "#FFAA0A",
    completed: "#1A1A1A",
};

function createPinIcon(status: string): string {
    const color = statusPinColors[status] || "#4B5563";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24C32 7.163 24.837 0 16 0z" fill="${color}"/>
        <circle cx="16" cy="14" r="6" fill="white" opacity="0.9"/>
        <rect x="13" y="11" width="6" height="6" rx="1" fill="${color}"/>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export default function DemolitionMap({
    announcements,
    selectedId,
    onSelectAnnouncement,
    className,
}: DemolitionMapProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    const center = useMemo(() => {
        if (selectedId) {
            const selected = announcements.find((a) => a.id === selectedId);
            if (selected) return selected.coordinates;
        }
        return defaultCenter;
    }, [selectedId, announcements]);

    const onMapClick = useCallback(() => {
        onSelectAnnouncement(null);
    }, [onSelectAnnouncement]);

    const selectedAnnouncement = useMemo(
        () => announcements.find((a) => a.id === selectedId),
        [announcements, selectedId]
    );

    if (!isLoaded) {
        return (
            <div className={cn("flex h-full w-full items-center justify-center bg-mercury-50 ", className)}>
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin -900 -transparent" />
                    <p className="text-sm text-mercury-500">Se încarcă harta...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("overflow-hidden", className)}>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={selectedId ? 12 : 8}
            options={mapOptions}
            onClick={onMapClick}
        >
            {announcements.map((announcement) => (
                <MarkerF
                    key={announcement.id}
                    position={announcement.coordinates}
                    icon={{
                        url: createPinIcon(announcement.status),
                        scaledSize: new google.maps.Size(
                            selectedId === announcement.id ? 40 : 32,
                            selectedId === announcement.id ? 50 : 40
                        ),
                        anchor: new google.maps.Point(
                            selectedId === announcement.id ? 20 : 16,
                            selectedId === announcement.id ? 50 : 40
                        ),
                    }}
                    onClick={() => onSelectAnnouncement(announcement.id)}
                    zIndex={selectedId === announcement.id ? 10 : 1}
                />
            ))}

            {selectedAnnouncement && (
                <InfoWindowF
                    position={selectedAnnouncement.coordinates}
                    onCloseClick={() => onSelectAnnouncement(null)}
                    options={{
                        pixelOffset: new google.maps.Size(0, -40),
                        maxWidth: 260,
                    }}
                >
                    <div className="p-1 font-body">
                        <p className="font-heading text-sm font-bold text-mercury-900 mb-1 leading-snug">
                            {selectedAnnouncement.title}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-mercury-500 mb-1.5">
                            <span>{buildingTypeLabels[selectedAnnouncement.buildingType]}</span>
                            <span className="text-mercury-500/30">|</span>
                            <span>{statusLabels[selectedAnnouncement.status]}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] text-mercury-500">Valoare estimată:</span>
                            <span className="font-data text-xs font-bold text-mercury-900">
                                {formatPrice(getTotalEstimatedValue(selectedAnnouncement))}
                            </span>
                        </div>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
        </div>
    );
}
