"use client";

import { forwardRef } from "react";
import type { DemolitionAnnouncement } from "@/lib/demolition-data";
import {
    buildingTypeLabels,
    statusLabels,
    getTotalEstimatedValue,
} from "@/lib/demolition-data";
import { formatPrice, cn } from "@/lib/utils";
import {
    Building2,
    Home,
    Landmark,
    Store,
    Warehouse,
    Factory,
    GraduationCap,
    Cross,
    MapPin,
    Calendar,
    Layers,
    Ruler,
    Eye,
} from "lucide-react";

// ── Icon mapping ──
const buildingTypeIconMap: Record<string, React.ElementType> = {
    'residential-apartment': Building2,
    'residential-house': Home,
    'commercial-office': Landmark,
    'commercial-retail': Store,
    'industrial-warehouse': Warehouse,
    'industrial-factory': Factory,
    'public-school': GraduationCap,
    'public-hospital': Cross,
};

// ── Status badge styles ──
const statusStyles: Record<string, string> = {
    'planned': 'bg-blue-50 text-blue-700',
    'in-progress': 'bg-amber-50 text-amber-700',
    'completed': 'bg-gray-100 text-gray-700',
};

interface DemolitionCardProps {
    announcement: DemolitionAnnouncement;
    isHighlighted?: boolean;
    onViewDetails?: (id: string) => void;
}

const DemolitionCard = forwardRef<HTMLDivElement, DemolitionCardProps>(
    function DemolitionCard({ announcement, isHighlighted = false, onViewDetails }, ref) {
        const IconComponent = buildingTypeIconMap[announcement.buildingType] || Building2;
        const totalValue = getTotalEstimatedValue(announcement);

        // Get top 4 materials by estimated value
        const topMaterials = [...announcement.estimatedMaterials]
            .sort((a, b) => b.estimatedValue - a.estimatedValue)
            .slice(0, 4);

        const scheduledDate = new Date(announcement.scheduledDate).toLocaleDateString("ro-MD", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-xl bg-chalk border border-stone/20 p-5 transition-all duration-200 card-hover",
                    isHighlighted && "ring-2 ring-forest"
                )}
            >
                {/* Header: Status + Building Type */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest/10">
                            <IconComponent className="h-4.5 w-4.5 text-forest" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[11px] font-semibold text-stone uppercase tracking-wide">
                                {buildingTypeLabels[announcement.buildingType]}
                            </span>
                        </div>
                    </div>
                    <span
                        className={cn(
                            "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold",
                            statusStyles[announcement.status]
                        )}
                    >
                        {statusLabels[announcement.status]}
                    </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-semibold text-sm text-charcoal leading-snug line-clamp-2 mb-2">
                    {announcement.title}
                </h3>

                {/* Location + Date */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-stone mb-3">
                    <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" strokeWidth={1.5} />
                        {announcement.address}, {announcement.city}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" strokeWidth={1.5} />
                        {scheduledDate}
                    </span>
                </div>

                {/* Building specs */}
                <div className="flex items-center gap-3 text-[11px] text-stone mb-4">
                    <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3" strokeWidth={1.5} />
                        {announcement.floors} {announcement.floors === 1 ? "etaj" : "etaje"}
                    </span>
                    <span className="text-stone/30">|</span>
                    <span className="flex items-center gap-1">
                        <Ruler className="h-3 w-3" strokeWidth={1.5} />
                        {announcement.totalArea.toLocaleString("ro-MD")} m²
                    </span>
                    <span className="text-stone/30">|</span>
                    <span>Anul {announcement.buildingYear}</span>
                </div>

                {/* Top recoverable materials with progress bars */}
                <div className="space-y-2 mb-4">
                    <p className="text-[11px] font-semibold text-stone uppercase tracking-wide">
                        Materiale recuperabile
                    </p>
                    {topMaterials.map((material, idx) => (
                        <div key={idx} className="space-y-0.5">
                            <div className="flex items-center justify-between text-[11px]">
                                <span className="text-charcoal font-medium truncate mr-2">
                                    {material.materialType}
                                </span>
                                <span className="text-stone shrink-0">
                                    {material.recoverabilityPercent}%
                                </span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-sand overflow-hidden">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-all duration-500",
                                        material.recoverabilityPercent >= 75
                                            ? "bg-eco"
                                            : material.recoverabilityPercent >= 50
                                              ? "bg-stone"
                                              : "bg-red-400"
                                    )}
                                    style={{ width: `${material.recoverabilityPercent}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total value */}
                <div className="flex items-center justify-between rounded-lg bg-sand/80 px-3 py-2 mb-4">
                    <span className="text-[11px] font-semibold text-stone">Valoare estimată totală</span>
                    <span className="font-data text-sm font-bold text-forest">
                        {formatPrice(totalValue)}
                    </span>
                </div>

                {/* Contractor + Action */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={announcement.contractor.avatar}
                            alt={announcement.contractor.name}
                            className="h-7 w-7 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                            <p className="text-[11px] font-semibold text-charcoal truncate">
                                {announcement.contractor.name}
                            </p>
                            <p className="text-[10px] text-stone truncate">
                                {announcement.contractor.company}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => onViewDetails?.(announcement.id)}
                        className="btn-magnetic flex items-center gap-1.5 rounded-lg bg-forest px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-forest/90 transition-colors"
                    >
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Vezi Detalii
                    </button>
                </div>
            </div>
        );
    }
);

export default DemolitionCard;
