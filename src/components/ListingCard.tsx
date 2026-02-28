"use client";

import Link from "next/link";
import type { Listing } from "@/lib/mock-data";
import { categories } from "@/lib/mock-data";
import { formatPrice, getConditionColor, cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

const categoryNameMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

interface ListingCardProps {
    listing: Listing;
    variant?: "grid" | "list";
}

export default function ListingCard({ listing, variant = "grid" }: ListingCardProps) {
    const categoryName = categoryNameMap[listing.category] || listing.category;

    if (variant === "list") {
        return (
            <Link href={`/listing/${listing.id}`} className="group card-hover flex gap-4 bg-white p-3 border border-mercury-200 transition-all">
                <div className="relative h-28 w-36 shrink-0 overflow-hidden bg-mercury-50">
                    <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" loading="lazy" />
                    {listing.isFree && (
                        <span className="absolute top-2 left-2 bg-eco px-2 py-0.5 text-[11px] font-semibold text-white">
                            GRATUIT
                        </span>
                    )}
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                        <h3 className="font-heading font-semibold text-sm text-mercury-900 line-clamp-1 transition-colors">
                            {listing.title}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="bg-mercury-500/10 -500/30 px-2 py-0.5 text-[11px] font-bold text-mercury-500">
                                {categoryName}
                            </span>
                            <span className={cn("px-2 py-0.5 text-[11px] font-bold", getConditionColor(listing.condition))}>
                                {listing.condition}
                            </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-mercury-500">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                                {listing.location} · {listing.distance} km
                            </span>
                            <span className="flex items-center gap-1">
                                {listing.seller.name}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="font-heading text-lg font-bold text-mercury-900">
                                {formatPrice(listing.price, listing.isFree)}
                            </span>
                            {listing.originalPrice && !listing.isFree && (
                                <span className="text-xs text-mercury-500 line-through">
                                    {formatPrice(listing.originalPrice)}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] text-mercury-500">
                            {listing.quantity} {listing.unit}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/listing/${listing.id}`} className="group card-hover flex flex-col bg-white border border-mercury-200 transition-all p-3">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-mercury-50">
                <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" loading="lazy" />
                {listing.isFree && (
                    <span className="absolute top-2 left-2 bg-eco px-2.5 py-1 text-xs font-semibold text-white">
                        GRATUIT
                    </span>
                )}
                {listing.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {listing.images.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 transition-colors ${i === 0 ? "bg-mercury-900" : "bg-white/60"}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col pt-3 px-1 pb-1">
                <h3 className="font-heading font-semibold text-sm text-mercury-900 line-clamp-2 leading-snug transition-colors">
                    {listing.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="bg-mercury-500/10 -500/30 px-2 py-0.5 text-[11px] font-bold text-mercury-500">
                        {categoryName}
                    </span>
                    <span className={cn("px-2 py-0.5 text-[11px] font-bold", getConditionColor(listing.condition))}>
                        {listing.condition}
                    </span>
                </div>

                {/* Seller + Location */}
                <div className="mt-2 flex items-center gap-2 text-[11px] text-mercury-500">
                    <span className="truncate">{listing.seller.name}</span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-mercury-500">
                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                    <span>{listing.location} · {listing.distance} km</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="font-heading text-lg font-bold text-mercury-900">
                            {formatPrice(listing.price, listing.isFree)}
                        </span>
                        {listing.originalPrice && !listing.isFree && (
                            <span className="text-xs text-mercury-500 line-through">
                                {formatPrice(listing.originalPrice)}
                            </span>
                        )}
                    </div>
                    <span className="text-[11px] text-mercury-500 shrink-0">
                        {listing.quantity} {listing.unit}
                    </span>
                </div>
            </div>
        </Link>
    );
}
