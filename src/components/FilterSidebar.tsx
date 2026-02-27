"use client";

import { useState } from "react";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  onClose?: () => void;
}

const conditions = ["New Surplus", "Lightly Used", "As-Is", "Salvage"];

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
    <div className="border-b border-stone/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-charcoal"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-stone transition-transform",
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-forest" strokeWidth={1.5} />
          <h3 className="font-heading text-base font-semibold text-charcoal">
            Filters
          </h3>
        </div>
        {onClose && (
          <button onClick={onClose} aria-label="Close filters">
            <X className="h-5 w-5 text-stone" strokeWidth={1.5} />
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="rounded border-stone/30 text-forest focus:ring-forest/20 h-3.5 w-3.5"
              />
              <span className="text-sm text-charcoal">{cat.name}</span>
              <span className="ml-auto text-xs text-stone">{cat.count}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Condition">
        <div className="space-y-2">
          {conditions.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedConditions.includes(c)}
                onChange={() => toggleCondition(c)}
                className="rounded border-stone/30 text-forest focus:ring-forest/20 h-3.5 w-3.5"
              />
              <span className="text-sm text-charcoal">{c}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-forest"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-full rounded-lg border border-stone/20 bg-sand/50 px-3 py-1.5 text-sm"
              placeholder="Min"
            />
            <span className="text-stone">—</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full rounded-lg border border-stone/20 bg-sand/50 px-3 py-1.5 text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Distance">
        <div className="flex flex-wrap gap-2">
          {["5 mi", "10 mi", "25 mi", "50 mi", "100+ mi"].map((d) => (
            <button
              key={d}
              className="rounded-full border border-stone/20 px-3 py-1.5 text-xs font-medium text-charcoal hover:bg-forest hover:text-white hover:border-forest transition-colors"
            >
              {d}
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="py-4 border-b border-stone/10">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-charcoal">
            Free Items Only
          </span>
          <button
            onClick={() => setFreeOnly(!freeOnly)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              freeOnly ? "bg-eco-green" : "bg-stone/20"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                freeOnly ? "left-[22px]" : "left-0.5"
              )}
            />
          </button>
        </label>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            setSelectedCategories([]);
            setSelectedConditions([]);
            setPriceRange([0, 1000]);
            setFreeOnly(false);
          }}
          className="flex-1 rounded-lg border border-stone/20 py-2 text-sm font-medium text-stone hover:bg-sand transition-colors"
        >
          Clear All
        </button>
        <button className="flex-1 rounded-lg bg-forest py-2 text-sm font-medium text-white hover:bg-forest-light transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
}
