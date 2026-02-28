"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import {
    demolitionAnnouncements,
    statusLabels,
    moldovanCities,
    getAllAnnouncementsStats,
    type DemolitionAnnouncement,
} from "@/lib/demolition-data";
import { formatPrice, formatNumber, cn } from "@/lib/utils";
import DemolitionCard from "@/components/DemolitionCard";
import DemolitionCalculator from "@/components/DemolitionCalculator";
import DemolitionMap from "@/components/DemolitionMap";
import {
    Building2,
    Calculator,
    ClipboardList,
    ChevronDown,
    TrendingUp,
    Recycle,
    MapPin,
} from "lucide-react";

type StatusFilter = "all" | "planned" | "in-progress" | "completed";
type RightTab = "announcements" | "calculator";

const statusFilterOptions: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Toate" },
    { value: "planned", label: "Planificate" },
    { value: "in-progress", label: "În Desfășurare" },
    { value: "completed", label: "Finalizate" },
];

export default function DemolitionsPage() {
    // ── State ──
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [cityFilter, setCityFilter] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rightTab, setRightTab] = useState<RightTab>("announcements");
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

    // ── Refs for scrolling to cards ──
    const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const listContainerRef = useRef<HTMLDivElement>(null);

    // ── Stats ──
    const stats = useMemo(() => getAllAnnouncementsStats(), []);

    // ── Filtered announcements ──
    const filtered = useMemo(() => {
        return demolitionAnnouncements.filter((a) => {
            if (statusFilter !== "all" && a.status !== statusFilter) return false;
            if (cityFilter && a.city !== cityFilter) return false;
            return true;
        });
    }, [statusFilter, cityFilter]);

    // ── Unique cities in current data ──
    const cities = useMemo(() => {
        const set = new Set(demolitionAnnouncements.map((a) => a.city));
        return moldovanCities.filter((c) => set.has(c));
    }, []);

    // ── Select announcement (from map or card) ──
    const handleSelectAnnouncement = useCallback(
        (id: string | null) => {
            setSelectedId(id);
            if (id) {
                setRightTab("announcements");
                // Scroll to card
                setTimeout(() => {
                    const cardEl = cardRefs.current.get(id);
                    if (cardEl && listContainerRef.current) {
                        cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                }, 100);
            }
        },
        []
    );

    // ── Register card ref ──
    const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
        if (el) {
            cardRefs.current.set(id, el);
        } else {
            cardRefs.current.delete(id);
        }
    }, []);

    // ── Close city dropdown on outside click ──
    useEffect(() => {
        function handleClickOutside() {
            setIsCityDropdownOpen(false);
        }
        if (isCityDropdownOpen) {
            document.addEventListener("click", handleClickOutside);
            return () => document.removeEventListener("click", handleClickOutside);
        }
    }, [isCityDropdownOpen]);

    return (
        <div className="min-h-screen bg-mercury-50">
            {/* ── Header ── */}
            <div className="-500/10 bg-mercury-50/80 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <div>
                            <h1 className="font-heading text-xl sm:text-2xl font-bold text-mercury-900 tracking-tight">
                                Demolări & Materiale Recuperabile
                            </h1>
                            <p className="mt-1 text-xs sm:text-sm text-mercury-500 max-w-xl">
                                Descoperă demolările planificate în Moldova și estimează valoarea materialelor
                                recuperabile. Transformă deșeurile de construcție în resurse valoroase.
                            </p>
                        </div>

                        {/* Stats bar */}
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-1.5">
                                <ClipboardList className="h-4 w-4 text-mercury-900" strokeWidth={1.5} />
                                <div>
                                    <p className="text-[10px] text-mercury-500 uppercase tracking-wide">Anunțuri</p>
                                    <p className="font-data text-sm font-bold text-mercury-900">
                                        {stats.total}
                                    </p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-mercury-500/15" />
                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="h-4 w-4 text-yellow-sea-500" strokeWidth={1.5} />
                                <div>
                                    <p className="text-[10px] text-mercury-500 uppercase tracking-wide">Valoare</p>
                                    <p className="font-data text-sm font-bold text-mercury-900">
                                        {formatNumber(stats.totalValue)} MDL
                                    </p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-mercury-500/15" />
                            <div className="flex items-center gap-1.5">
                                <Recycle className="h-4 w-4 text-eco" strokeWidth={1.5} />
                                <div>
                                    <p className="text-[10px] text-mercury-500 uppercase tracking-wide">
                                        Recuperabil
                                    </p>
                                    <p className="font-data text-sm font-bold text-mercury-900">
                                        {formatNumber(Math.round(stats.totalTonnage))} t
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Layout ── */}
            <div className="mx-auto max-w-7xl">
                {/* Desktop: split view | Mobile: stacked */}
                <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-10rem)]">
                    {/* ── Left: Map ── */}
                    <div className="h-[40vh] lg:h-full lg:w-[55%] lg:lg:-500/10 p-3 lg:p-4">
                        <DemolitionMap
                            announcements={filtered}
                            selectedId={selectedId}
                            onSelectAnnouncement={handleSelectAnnouncement}
                            className="h-full w-full"
                        />
                    </div>

                    {/* ── Right: Content ── */}
                    <div className="flex flex-1 flex-col lg:w-[45%] overflow-hidden">
                        {/* Right tab switcher */}
                        <div className="flex -500/10 bg-mercury-50 px-4 pt-3">
                            <button
                                onClick={() => setRightTab("announcements")}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold -2 transition-colors -mb-px",
                                    rightTab === "announcements"
                                        ? "-900 text-mercury-900"
                                        : "text-mercury-500 hover:text-mercury-900"
                                )}
                            >
                                <Building2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                                Anunțuri
                                <span className="bg-mercury-50 px-1.5 py-0.5 text-[10px] font-bold text-mercury-500">
                                    {filtered.length}
                                </span>
                            </button>
                            <button
                                onClick={() => setRightTab("calculator")}
                                className={cn(
                                    "flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold -2 transition-colors -mb-px",
                                    rightTab === "calculator"
                                        ? "-900 text-mercury-900"
                                        : "text-mercury-500 hover:text-mercury-900"
                                )}
                            >
                                <Calculator className="h-3.5 w-3.5" strokeWidth={1.5} />
                                Calculator
                            </button>
                        </div>

                        {/* ── Announcements Tab ── */}
                        {rightTab === "announcements" && (
                            <>
                                {/* Filters */}
                                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-mercury-50/50 -500/10">
                                    {/* Status filter pills */}
                                    <div className="flex gap-1.5">
                                        {statusFilterOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => setStatusFilter(opt.value)}
                                                className={cn(
                                                    "px-3 py-1.5 text-[11px] font-semibold transition-colors",
                                                    statusFilter === opt.value
                                                        ? "bg-mercury-900 text-white"
                                                        : "bg-mercury-50 text-mercury-500 hover:bg-mercury-500/10 hover:text-mercury-900"
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>

                                    {/* City filter dropdown */}
                                    <div className="relative ml-auto">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsCityDropdownOpen((prev) => !prev);
                                            }}
                                            className="flex items-center gap-1.5 -500/20 bg-mercury-50 px-3 py-1.5 text-[11px] font-semibold text-mercury-900 hover:-900 transition-colors"
                                        >
                                            <MapPin className="h-3 w-3 text-mercury-500" strokeWidth={1.5} />
                                            {cityFilter || "Toate orașele"}
                                            <ChevronDown
                                                className={cn(
                                                    "h-3 w-3 text-mercury-500 transition-transform",
                                                    isCityDropdownOpen && "rotate-180"
                                                )}
                                                strokeWidth={1.5}
                                            />
                                        </button>
                                        {isCityDropdownOpen && (
                                            <div className="absolute right-0 top-full mt-1 z-20 w-48 bg-mercury-50 -500/20 overflow-hidden">
                                                <button
                                                    onClick={() => {
                                                        setCityFilter("");
                                                        setIsCityDropdownOpen(false);
                                                    }}
                                                    className={cn(
                                                        "w-full text-left px-3 py-2 text-[11px] font-semibold transition-colors",
                                                        !cityFilter
                                                            ? "bg-mercury-900/5 text-mercury-900"
                                                            : "text-mercury-900 hover:bg-mercury-50"
                                                    )}
                                                >
                                                    Toate orașele
                                                </button>
                                                {cities.map((city) => (
                                                    <button
                                                        key={city}
                                                        onClick={() => {
                                                            setCityFilter(city);
                                                            setIsCityDropdownOpen(false);
                                                        }}
                                                        className={cn(
                                                            "w-full text-left px-3 py-2 text-[11px] font-semibold transition-colors",
                                                            cityFilter === city
                                                                ? "bg-mercury-900/5 text-mercury-900"
                                                                : "text-mercury-900 hover:bg-mercury-50"
                                                        )}
                                                    >
                                                        {city}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Scrollable card list */}
                                <div
                                    ref={listContainerRef}
                                    className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
                                >
                                    {filtered.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="flex h-14 w-14 items-center justify-center bg-mercury-50 mb-3">
                                                <Building2 className="h-6 w-6 text-mercury-500" strokeWidth={1.5} />
                                            </div>
                                            <p className="text-sm font-semibold text-mercury-900">
                                                Niciun anunț găsit
                                            </p>
                                            <p className="text-xs text-mercury-500 mt-1">
                                                Modificați filtrele pentru a vedea alte rezultate.
                                            </p>
                                        </div>
                                    ) : (
                                        filtered.map((announcement) => (
                                            <DemolitionCard
                                                key={announcement.id}
                                                ref={(el) => setCardRef(announcement.id, el)}
                                                announcement={announcement}
                                                isHighlighted={selectedId === announcement.id}
                                                onViewDetails={handleSelectAnnouncement}
                                            />
                                        ))
                                    )}
                                </div>
                            </>
                        )}

                        {/* ── Calculator Tab ── */}
                        {rightTab === "calculator" && (
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                <DemolitionCalculator />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
