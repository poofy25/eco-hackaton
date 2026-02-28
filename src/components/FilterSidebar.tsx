"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal, Store, UserCircle } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
    onClose?: () => void;
}

const conditions = ["Surplus Nou", "Ușor Utilizat", "În Starea Actuală", "Recuperat"];

const popularMarkets = [
    "Nanumarket",
    "Caparol Shop",
    "Dedeman",
    "Megatex",
    "Supraten",
    "Floare-Carpet",
];

type SellerType = "all" | "markets" | "individual";

function FilterSection({
    title,
    defaultOpen = true,
    children,
}: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="-500-200 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between text-sm font-semibold text-mercury-900"
            >
                {title}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-mercury-500 transition-transform",
                        open && "rotate-180"
                    )}
                    strokeWidth={1.5}
                />
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
    const [sellerType, setSellerType] = useState<SellerType>("all");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [freeOnly, setFreeOnly] = useState(false);

    const toggleCategory = (id: string) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleCondition = (c: string) => {
        setSelectedConditions((prev) =>
            prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
        );
    };

    const toggleMarket = (m: string) => {
        setSelectedMarkets((prev) =>
            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
        );
    };

    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col">
            <div className="flex items-center justify-between mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-mercury-900" strokeWidth={1.5} />
                    <h3 className="font-heading text-base font-semibold text-mercury-900">
                        Filtre
                    </h3>
                </div>
                {onClose && (
                    <button onClick={onClose} aria-label="Închide filtrele">
                        <X className="h-5 w-5 text-mercury-500" strokeWidth={1.5} />
                    </button>
                )}
            </div>

            {/* Scrollable filter body */}
            <div className="flex-1 overflow-y-auto min-h-0 pr-2 pb-6 custom-scrollbar">
                {/* FREE TOGGLE */}
                <div className="py-4 -500-200">
                    <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm font-semibold text-mercury-900">
                            Doar Articole Gratuite
                        </span>
                        <button
                            onClick={() => setFreeOnly(!freeOnly)}
                            className={cn(
                                "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center border-[1.5px] transition-colors duration-300 ease-in-out",
                                freeOnly ? "bg-mercury-900 border-mercury-900" : "bg-transparent border-mercury-400"
                            )}
                            role="switch"
                            aria-checked={freeOnly}
                        >
                            <span className="sr-only">Doar Articole Gratuite</span>
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "pointer-events-none inline-block h-3.5 w-3.5 bg-current transform transition duration-300 ease-in-out",
                                    freeOnly ? "translate-x-4 text-white" : "translate-x-0.5 text-mercury-400"
                                )}
                            />
                        </button>
                    </label>
                </div>

                {/* CATEGORY */}
                <FilterSection title="Categorie">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => {
                            const selected = selectedCategories.includes(cat.id);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleCategory(cat.id)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-semibold transition-colors border",
                                        selected
                                            ? "bg-mercury-900 text-white border-mercury-900"
                                            : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                                    )}
                                >
                                    {cat.name}
                                    <span className={cn("ml-1.5", selected ? "text-white/70" : "text-mercury-500")}>
                                        {cat.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* CONDITION */}
                <FilterSection title="Stare">
                    <div className="flex flex-wrap gap-2">
                        {conditions.map((c) => {
                            const selected = selectedConditions.includes(c);
                            return (
                                <button
                                    key={c}
                                    onClick={() => toggleCondition(c)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-semibold transition-colors border",
                                        selected
                                            ? "bg-mercury-900 text-white border-mercury-900"
                                            : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                                    )}
                                >
                                    {c}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* PRICE RANGE */}
                <FilterSection title="Interval de Preț">
                    <div className="space-y-3">
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full accent-mercury-900 h-1 bg-mercury-200 appearance-none outline-none cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full border border-mercury-200 bg-transparent px-3 py-1.5 text-sm focus:border-mercury-500 focus:outline-none transition-colors"
                                placeholder="Min"
                            />
                            <span className="text-mercury-500">—</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full border border-mercury-200 bg-transparent px-3 py-1.5 text-sm focus:border-mercury-500 focus:outline-none transition-colors"
                                placeholder="Max"
                            />
                        </div>
                    </div>
                </FilterSection>

                {/* DISTANCE */}
                <FilterSection title="Distanță">
                    <div className="flex flex-wrap gap-2">
                        {["5 km", "10 km", "25 km", "50 km", "100+ km"].map((d) => (
                            <button
                                key={d}
                                className="px-3 py-1.5 text-xs font-semibold text-mercury-900 border border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50 transition-colors"
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </FilterSection>

                {/* POPULAR MARKETS */}
                <FilterSection title="Magazine Populare">
                    <div className="flex flex-wrap gap-2">
                        {popularMarkets.map((m) => {
                            const selected = selectedMarkets.includes(m);
                            return (
                                <button
                                    key={m}
                                    onClick={() => toggleMarket(m)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors border",
                                        selected
                                            ? "bg-mercury-900 text-white border-mercury-900"
                                            : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                                    )}
                                >
                                    <Store className="h-3 w-3" strokeWidth={1.5} />
                                    {m}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>

                {/* SELLER TYPE */}
                <FilterSection title="Tip Vânzător">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setSellerType("all")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border",
                                sellerType === "all"
                                    ? "bg-mercury-900 text-white border-mercury-900"
                                    : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                            )}
                        >
                            Toți Vânzătorii
                        </button>
                        <button
                            onClick={() => setSellerType("markets")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border",
                                sellerType === "markets"
                                    ? "bg-mercury-900 text-white border-mercury-900"
                                    : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                            )}
                        >
                            <Store className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Magazine & Depozite
                        </button>
                        <button
                            onClick={() => setSellerType("individual")}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors border",
                                sellerType === "individual"
                                    ? "bg-mercury-900 text-white border-mercury-900"
                                    : "bg-transparent text-mercury-900 border-mercury-200 hover:border-mercury-500 hover:bg-mercury-50"
                            )}
                        >
                            <UserCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
                            Vânzători Individuali
                        </button>
                    </div>
                </FilterSection>
            </div>

            {/* Fixed bottom buttons */}
            <div className="mt-4 flex gap-2 shrink-0 pt-4 border-t border-mercury-200 bg-white">
                <button
                    onClick={() => {
                        setSelectedCategories([]);
                        setSelectedConditions([]);
                        setSelectedMarkets([]);
                        setSellerType("all");
                        setPriceRange([0, 10000]);
                        setFreeOnly(false);
                    }}
                    className="flex-1 border border-mercury-200 py-2 text-sm font-medium text-mercury-900 hover:bg-mercury-50 transition-colors"
                >
                    Șterge Tot
                </button>
                <button className="flex-1 bg-mercury-900 text-white py-2 text-sm font-semibold hover:bg-mercury-800 transition-colors">
                    Aplică
                </button>
            </div>
        </div>
    );
}
