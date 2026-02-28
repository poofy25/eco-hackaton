"use client";

import Link from "next/link";
import type { Listing } from "@/lib/mock-data";
import { categories } from "@/lib/mock-data";
import { formatPrice, getConditionColor, cn } from "@/lib/utils";
import { MapPin, Star } from "lucide-react";

const categoryNameMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

interface ListingCardProps {
    listing: Listing;
    variant?: "grid" | "list";
}

export default function ListingCard({ listing, variant = "grid" }: ListingCardProps) {
    const categoryName = categoryNameMap[listing.category] || listing.category;
    const discount =
        listing.originalPrice && !listing.isFree
            ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
            : 0;

    if (variant === "list") {
        return (
            <Link href={`/listing/${listing.id}`} className="group card-hover flex gap-4 rounded-xl bg-white p-3 border border-stone-200 transition-all">
                <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-lg bg-sand">
                    <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    {listing.isFree && (
                        <span className="absolute top-2 left-2 rounded-full bg-eco px-2 py-0.5 text-[11px] font-semibold text-white">
                            GRATUIT
                        </span>
                    )}
                    {discount > 0 && !listing.isFree && (
                        <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-charcoal">
                            -{discount}%
                        </span>
                    )}
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                        <h3 className="font-heading font-semibold text-sm text-charcoal line-clamp-1 transition-colors">
                            {listing.title}
                        </h3>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <span className="rounded-full bg-sage/10 border border-sage/30 px-2 py-0.5 text-[11px] font-bold text-sage">
                                {categoryName}
                            </span>
                            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", getConditionColor(listing.condition))}>
                                {listing.condition}
                            </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-[11px] text-stone">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                                {listing.location} · {listing.distance} km
                            </span>
                            <span className="flex items-center gap-1">
                                <img src={listing.seller.avatar} alt={listing.seller.name} className="h-3.5 w-3.5 rounded-full object-cover" />
                                {listing.seller.name}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="font-heading text-lg font-bold text-charcoal">
                                {formatPrice(listing.price, listing.isFree)}
                            </span>
                            {listing.originalPrice && !listing.isFree && (
                                <span className="text-xs text-stone line-through">
                                    {formatPrice(listing.originalPrice)}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] text-stone">
                            {listing.quantity} {listing.unit}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/listing/${listing.id}`} className="group card-hover flex flex-col rounded-xl bg-white border border-stone-200 transition-all p-3">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
                <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                {listing.isFree && (
                    <span className="absolute top-2 left-2 rounded-full bg-eco px-2.5 py-1 text-xs font-semibold text-white">
                        GRATUIT
                    </span>
                )}
                {discount > 0 && !listing.isFree && (
                    <span className="absolute top-2 right-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-charcoal">
                        -{discount}%
                    </span>
                )}
                {listing.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {listing.images.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-full transition-colors ${i === 0 ? "bg-charcoal" : "bg-white/60"}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col pt-3 px-1 pb-1">
                <h3 className="font-heading font-semibold text-sm text-charcoal line-clamp-2 leading-snug transition-colors">
                    {listing.title}
                </h3>

                <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="rounded-full bg-sage/10 border border-sage/30 px-2 py-0.5 text-[11px] font-bold text-sage">
                        {categoryName}
                    </span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", getConditionColor(listing.condition))}>
                        {listing.condition}
                    </span>
                </div>

                {/* Seller + Location */}
                <div className="mt-2 flex items-center gap-2 text-[11px] text-stone">
                    <img src={listing.seller.avatar} alt={listing.seller.name} className="h-4 w-4 rounded-full object-cover" />
                    <span className="truncate">{listing.seller.name}</span>
                    <span className="text-stone/40">·</span>
                    <span className="flex items-center gap-0.5 shrink-0">
                        <Star className="h-3 w-3 fill-current text-accent" strokeWidth={0} />
                        {listing.seller.rating}
                    </span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-[11px] text-stone">
                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
                    <span>{listing.location} · {listing.distance} km</span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="font-heading text-lg font-bold text-charcoal">
                            {formatPrice(listing.price, listing.isFree)}
                        </span>
                        {listing.originalPrice && !listing.isFree && (
                            <span className="text-xs text-stone line-through">
                                {formatPrice(listing.originalPrice)}
                            </span>
                        )}
                    </div>
                    <span className="text-[11px] text-stone shrink-0">
                        {listing.quantity} {listing.unit}
                    </span>
                </div>
            </div>
        </Link>
    );
}
