"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import {
    demolitionAnnouncements,
} from "@/lib/demolition-data";
import { cn } from "@/lib/utils";
import DemolitionCard from "@/components/DemolitionCard";
import DemolitionMap from "@/components/DemolitionMap";
import {
    Building2,
    ChevronRight,
} from "lucide-react";

type StatusFilter = "all" | "planned" | "in-progress" | "completed";

const statusFilterOptions: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Toate" },
    { value: "planned", label: "Planificate" },
    { value: "in-progress", label: "În Desfășurare" },
    { value: "completed", label: "Finalizate" },
];

export default function DemolitionsPage() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const listContainerRef = useRef<HTMLDivElement>(null);

    const filtered = useMemo(() => {
        return demolitionAnnouncements.filter((a) => {
            if (statusFilter !== "all" && a.status !== statusFilter) return false;
            return true;
        });
    }, [statusFilter]);

    const handleSelectAnnouncement = useCallback(
        (id: string | null) => {
            setSelectedId(id);
            if (id) {
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

    const setCardRef = useCallback((id: string, el: HTMLDivElement | null) => {
        if (el) {
            cardRefs.current.set(id, el);
        } else {
            cardRefs.current.delete(id);
        }
    }, []);

    return (
        <section className="bg-transparent">
            <div className="mx-auto max-w-7xl bg-white px-4 sm:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-sm text-mercury-500 mb-6">
                    <Link href="/" className="hover:text-mercury-900 transition-colors">
                        Acasă
                    </Link>
                    <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
                    <span className="text-mercury-900 font-medium">
                        Anunțuri Demolări
                    </span>
                </nav>


                {/* Horizontal layout: Announcements left, Map right */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Announcements */}
                    <div className="flex-1 min-w-0">
                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <div className="flex gap-1.5">
                                {statusFilterOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStatusFilter(opt.value)}
                                        className={cn(
                                            "px-3 py-1.5 text-[11px] font-semibold transition-colors",
                                            statusFilter === opt.value
                                                ? "bg-mercury-900 text-white"
                                                : "border border-mercury-200 text-mercury-500 hover:bg-mercury-50 hover:text-mercury-900"
                                        )}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                        </div>

                        {/* Results count */}
                        <div className="flex items-center gap-2 mb-4">
                            <h2 className="font-heading text-lg font-bold text-mercury-900">
                                Anunțuri Demolări
                            </h2>
                            <span className="text-sm text-mercury-500">
                                {filtered.length} rezultate
                            </span>
                        </div>

                        {/* Announcement cards */}
                        <div ref={listContainerRef}>
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {filtered.map((announcement) => (
                                        <DemolitionCard
                                            key={announcement.id}
                                            ref={(el) => setCardRef(announcement.id, el)}
                                            announcement={announcement}
                                            isHighlighted={selectedId === announcement.id}
                                            onViewDetails={handleSelectAnnouncement}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Sticky Map */}
                    <div className="lg:w-[45%] shrink-0">
                        <div className="sticky top-20">
                            <div className="h-[50vh] lg:h-[calc(100vh-8rem)] border border-mercury-200">
                                <DemolitionMap
                                    announcements={filtered}
                                    selectedId={selectedId}
                                    onSelectAnnouncement={handleSelectAnnouncement}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer — matching homepage */}
            <footer className="bg-transparent">
                <div className="mx-auto max-w-7xl bg-white px-4 sm:px-8 py-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-mercury-600">
                            &copy; 2026 Salvio. Toate drepturile rezervate.
                        </p>
                    </div>
                </div>
            </footer>
        </section>
    );
}
