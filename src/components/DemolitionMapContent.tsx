"use client";

import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { DemolitionAnnouncement } from "@/lib/demolition-data";
import { statusLabels, buildingTypeLabels, getTotalEstimatedValue } from "@/lib/demolition-data";
import { formatPrice } from "@/lib/utils";

interface DemolitionMapContentProps {
    announcements: DemolitionAnnouncement[];
    selectedId: string | null;
    onSelectAnnouncement: (id: string | null) => void;
}

const defaultCenter: [number, number] = [47.0245, 28.8328];

const statusPinColors: Record<string, string> = {
    planned: "#4B5563",
    "in-progress": "#FFAA0A",
    completed: "#1A1A1A",
};

function createMarkerIcon(status: string, isSelected: boolean): L.DivIcon {
    const color = statusPinColors[status] || "#4B5563";
    const size = isSelected ? 24 : 20;
    return L.divIcon({
        className: "custom-marker",
        html: `<div style="
            width: ${size}px;
            height: ${size}px;
            border-radius: 50% 50% 50% 0;
            background: ${color};
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
    });
}

// Centers map when selectedId changes
function MapCenterController({
    center,
    zoom,
}: {
    center: [number, number];
    zoom: number;
}) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [map, center, zoom]);
    return null;
}

export function DemolitionMapContent({
    announcements,
    selectedId,
    onSelectAnnouncement,
}: DemolitionMapContentProps) {
    const center = useMemo((): [number, number] => {
        if (selectedId) {
            const selected = announcements.find((a) => a.id === selectedId);
            if (selected) {
                return [selected.coordinates.lat, selected.coordinates.lng];
            }
        }
        return defaultCenter;
    }, [selectedId, announcements]);

    const zoom = selectedId ? 12 : 8;
    const selectedAnnouncement = useMemo(
        () => announcements.find((a) => a.id === selectedId),
        [announcements, selectedId]
    );

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="h-full w-full"
            style={{ minHeight: 300 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapCenterController center={center} zoom={zoom} />
            {announcements.map((announcement) => (
                <Marker
                    key={announcement.id}
                    position={[announcement.coordinates.lat, announcement.coordinates.lng]}
                    icon={createMarkerIcon(
                        announcement.status,
                        selectedId === announcement.id
                    )}
                    eventHandlers={{
                        click: () => onSelectAnnouncement(announcement.id),
                    }}
                >
                    <Popup
                        onClose={() => onSelectAnnouncement(null)}
                        className="custom-popup"
                    >
                        <div className="p-1 font-body min-w-[200px]">
                            <p className="font-heading text-sm font-bold text-mercury-900 mb-1 leading-snug">
                                {announcement.title}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-mercury-500 mb-1.5">
                                <span>{buildingTypeLabels[announcement.buildingType]}</span>
                                <span className="text-mercury-500/30">|</span>
                                <span>{statusLabels[announcement.status]}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] text-mercury-500">Valoare estimată:</span>
                                <span className="font-data text-xs font-bold text-mercury-900">
                                    {formatPrice(getTotalEstimatedValue(announcement))}
                                </span>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
