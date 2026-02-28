"use client";

import Link from "next/link";
import type { Listing } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

interface ListingCardProps {
    listing: Listing;
    variant?: "grid" | "list";
}

export default function ListingCard({ listing, variant = "grid" }: ListingCardProps) {
    if (variant === "list") {
        return (
            <Link href={`/listing/${listing.id}`} className="group card-hover flex gap-4 rounded-none bg-white p-3 border border-black-300 transition-all">
                <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-none p-2 bg-[#FAF9F6] border border-black-300">
                    <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    {listing.isFree && (
                        <span className="absolute top-2 left-2 rounded-none bg-black-500 px-2 py-0.5 text-[11px] font-semibold text-white"> GRATUIT </span>
                    )}
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                        <h3 className="font-heading font-semibold text-sm text-black-900 line-clamp-1 transition-colors">
                            {listing.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="rounded-none bg-[#FED601]/20 border border-[#FED601] px-2 py-0.5 text-[11px] font-bold text-black-900">
                                {listing.category}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className={`font-heading text-lg font-bold text-black-900`}>
                            {formatPrice(listing.price)}
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/listing/${listing.id}`} className="group card-hover flex flex-col rounded-none bg-white border border-black-300 transition-all p-3">
            {/* Image enclosed in a padded box */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF9F6] border border-black-300">
                <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                {/* Badges */}
                {listing.isFree && (
                    <span className="absolute top-2 left-2 rounded-none bg-black-500 px-2.5 py-1 text-xs font-semibold text-white "> GRATUIT </span>
                )}
                {/* Image count dots left unharmed */}
                {listing.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {listing.images.map((_, i) => (
                            <div key={i} className={`h-1.5 w-1.5 rounded-none transition-colors ${i === 0 ? "bg-black-900" : "bg-black-300"}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col pt-4 px-1 pb-1">
                <h3 className="font-heading font-semibold text-sm text-black-900 line-clamp-2 leading-snug transition-colors">
                    {listing.title}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-none bg-[#FED601]/20 border border-[#FED601] px-2 py-0.5 text-[11px] font-bold text-black-900">
                        {listing.category}
                    </span>
                </div>

                {/* Price */}
                <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                        <span className={`font-heading text-lg font-bold text-black-900`}>
                            {formatPrice(listing.price, listing.isFree)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
