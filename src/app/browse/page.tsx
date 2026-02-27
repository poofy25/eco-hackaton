"use client";

import { useState } from "react";
import { SlidersHorizontal, LayoutGrid, List, ChevronRight } from "lucide-react";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import FilterSidebar from "@/components/FilterSidebar";
import { listings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-stone mb-6">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
        <span className="text-charcoal font-medium">All Materials</span>
      </nav>

      <div className="flex gap-8">
        {/* Filter Sidebar — Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-20">
            <FilterSidebar />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-xl font-bold text-charcoal">
                All Materials
              </h1>
              <span className="text-sm text-stone">{listings.length} results</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 rounded-lg border border-stone/20 px-3 py-2 text-sm font-medium text-charcoal hover:bg-sand transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
                Filters
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="nearest">Nearest</option>
                <option value="most-saved">Most Saved</option>
              </select>

              {/* View Toggle */}
              <div className="hidden sm:flex rounded-lg border border-stone/20 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === "grid" ? "bg-forest text-white" : "bg-chalk text-stone hover:bg-sand"
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 transition-colors",
                    viewMode === "list" ? "bg-forest text-white" : "bg-chalk text-stone hover:bg-sand"
                  )}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Listing Grid */}
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                : "flex flex-col gap-3"
            )}
          >
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant={viewMode}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters Bottom Sheet */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-charcoal/50"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-chalk p-6">
            <FilterSidebar onClose={() => setFiltersOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
