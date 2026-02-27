"use client";

import Link from "next/link";
import { Heart, Share2, Star, MapPin } from "lucide-react";
import type { Listing } from "@/lib/mock-data";
import { formatPrice, formatDistance, getConditionColor, getDiscountPercent } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
  variant?: "grid" | "list";
}

export default function ListingCard({ listing, variant = "grid" }: ListingCardProps) {
  const discountPercent =
    !listing.isFree && listing.originalPrice
      ? getDiscountPercent(listing.price, listing.originalPrice)
      : 0;

  if (variant === "list") {
    return (
      <Link
        href={`/listing/${listing.id}`}
        className="group card-hover flex gap-4 rounded-xl bg-chalk p-3 shadow-warm hover:shadow-warm-lg"
      >
        <div className="relative h-28 w-36 shrink-0 overflow-hidden rounded-lg">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {listing.isFree && (
            <span className="absolute top-2 left-2 rounded-md bg-eco-green px-2 py-0.5 text-[11px] font-semibold text-white">
              FREE
            </span>
          )}
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 rounded-md bg-terracotta px-2 py-0.5 text-[11px] font-semibold text-white">
              -{discountPercent}%
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <h3 className="font-heading font-semibold text-sm text-charcoal line-clamp-1 group-hover:text-forest transition-colors">
              {listing.title}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${getConditionColor(listing.condition)}`}>
                {listing.condition}
              </span>
              <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-sage">
                {listing.category}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className={`font-heading text-lg font-bold ${listing.isFree ? "text-eco-green" : "text-charcoal"}`}>
              {formatPrice(listing.price, listing.isFree)}
            </span>
            <span className="flex items-center gap-1 text-xs text-stone">
              <MapPin className="h-3 w-3" strokeWidth={1.5} />
              {listing.location} · {formatDistance(listing.distance)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group card-hover flex flex-col rounded-xl bg-chalk shadow-warm hover:shadow-warm-lg overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Badges */}
        {listing.isFree && (
          <span className="absolute top-3 left-3 rounded-md bg-eco-green px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            FREE
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 rounded-md bg-terracotta px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            -{discountPercent}%
          </span>
        )}
        {/* Image count dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {listing.images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
        {/* Quick actions on hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            aria-label="Save"
          >
            <Heart className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4 text-charcoal" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading font-semibold text-sm text-charcoal line-clamp-2 leading-snug group-hover:text-forest transition-colors">
          {listing.title}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${getConditionColor(listing.condition)}`}>
            {listing.condition}
          </span>
        </div>

        {/* Price + Location */}
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <span className={`font-heading text-lg font-bold ${listing.isFree ? "text-eco-green" : "text-charcoal"}`}>
              {formatPrice(listing.price, listing.isFree)}
            </span>
            {listing.originalPrice && !listing.isFree && (
              <span className="ml-1.5 text-xs text-stone line-through">
                {formatPrice(listing.originalPrice)}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-[11px] text-stone">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {formatDistance(listing.distance)}
          </span>
        </div>

        {/* Seller */}
        <div className="mt-2.5 flex items-center gap-2 pt-2.5 border-t border-stone/10">
          <img
            src={listing.seller.avatar}
            alt={listing.seller.name}
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-xs text-stone truncate">{listing.seller.name}</span>
          <div className="ml-auto flex items-center gap-0.5">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-charcoal">{listing.seller.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
