"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle, Eye, Heart, Pause, Play, Trash2, Edit } from "lucide-react";
import { listings } from "@/lib/mock-data";
import { formatPrice, formatDate, cn } from "@/lib/utils";

const statusFilters = ["All", "Active", "Paused", "Sold"];

const statusBadge: Record<string, string> = {
  active: "bg-eco-green/10 text-eco-green",
  paused: "bg-amber-100 text-amber-700",
  sold: "bg-stone/10 text-stone",
};

export default function MyListings() {
  const [filter, setFilter] = useState("All");

  // Use first 8 listings as seller's own
  const myListings = listings.slice(0, 8);

  const filtered =
    filter === "All"
      ? myListings
      : myListings.filter(
          (l) => l.status.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          My Listings
        </h1>
        <Link
          href="/dashboard/new-listing"
          className="btn-magnetic btn-cta flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-white"
        >
          <PlusCircle className="h-4 w-4" strokeWidth={1.5} />
          New Listing
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "bg-forest text-white"
                : "bg-chalk text-stone hover:bg-sand border border-stone/15"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((listing) => (
          <div
            key={listing.id}
            className="rounded-xl bg-chalk p-4 shadow-warm"
          >
            <div className="flex gap-3">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="h-20 w-20 rounded-lg object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-charcoal line-clamp-2">
                  {listing.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                      statusBadge[listing.status]
                    }`}
                  >
                    {listing.status}
                  </span>
                  <span className="text-xs text-stone font-medium">
                    {listing.isFree ? "FREE" : formatPrice(listing.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-stone">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" strokeWidth={1.5} />
                {listing.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" strokeWidth={1.5} />
                {listing.savedCount}
              </span>
              <span className="ml-auto">Listed {formatDate(listing.listedAt)}</span>
            </div>

            <div className="mt-3 pt-3 border-t border-stone/10 flex gap-2">
              <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-charcoal hover:bg-sand transition-colors border border-stone/15">
                <Edit className="h-3 w-3" strokeWidth={1.5} /> Edit
              </button>
              <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-charcoal hover:bg-sand transition-colors border border-stone/15">
                {listing.status === "active" ? (
                  <><Pause className="h-3 w-3" strokeWidth={1.5} /> Pause</>
                ) : (
                  <><Play className="h-3 w-3" strokeWidth={1.5} /> Activate</>
                )}
              </button>
              <button className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-terracotta hover:bg-terracotta/5 transition-colors border border-stone/15">
                <Trash2 className="h-3 w-3" strokeWidth={1.5} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
