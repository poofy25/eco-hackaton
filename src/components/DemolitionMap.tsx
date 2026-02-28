"use client";

import dynamic from "next/dynamic";
import type { DemolitionAnnouncement } from "@/lib/demolition-data";
import { cn } from "@/lib/utils";

// Leaflet CSS must be imported for map tiles and controls
import "leaflet/dist/leaflet.css";

interface DemolitionMapProps {
    announcements: DemolitionAnnouncement[];
    selectedId: string | null;
    onSelectAnnouncement: (id: string | null) => void;
    className?: string;
}

// Dynamically import map to avoid SSR issues with Leaflet (uses window)
const MapContent = dynamic<DemolitionMapProps>(
    () => import("./DemolitionMapContent").then((m) => m.DemolitionMapContent),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full w-full items-center justify-center bg-[#f5f5f3]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-mercury-200 border-t-mercury-900" />
                    <p className="text-sm text-mercury-500">Se încarcă harta...</p>
                </div>
            </div>
        ),
    }
);

export default function DemolitionMap(props: DemolitionMapProps) {
    return (
        <div className={cn("h-full w-full min-h-[300px]", props.className)}>
            <MapContent {...props} />
        </div>
    );
}
