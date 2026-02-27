"use client";

import Link from "next/link";
import { ShoppingBag, Heart, DollarSign, Leaf } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ListingCard from "@/components/ListingCard";
import { listings, orders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  ready: "bg-eco-green/10 text-eco-green",
  completed: "bg-forest/10 text-forest",
  cancelled: "bg-terracotta/10 text-terracotta",
};

const statusSteps = ["Placed", "Confirmed", "Ready", "Completed"];

export default function BuyerOverview() {
  const savedListings = listings.slice(2, 6);
  const activeOrders = orders.filter((o) => o.status !== "completed" && o.status !== "cancelled");

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-8">
        My Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={ShoppingBag} label="Orders Placed" value="7" />
        <StatsCard icon={Heart} label="Saved Items" value="12" />
        <StatsCard icon={DollarSign} label="Total Savings" value="$2,340" trend="vs. retail prices" trendUp />
        <StatsCard icon={Leaf} label="Impact" value="1,450 kg" trend="waste diverted" trendUp />
      </div>

      {/* Active Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-charcoal">
            Active Orders
          </h2>
          <Link
            href="/buyer/orders"
            className="text-sm font-medium text-forest hover:text-forest-light transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {activeOrders.map((order) => {
            const stepIndex =
              order.status === "pending" ? 0 :
              order.status === "confirmed" ? 1 :
              order.status === "ready" ? 2 : 3;

            return (
              <div key={order.id} className="rounded-xl bg-chalk p-5 shadow-warm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-mono text-sm font-medium text-charcoal">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-stone">{formatDate(order.createdAt)}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Progress steps */}
                <div className="flex items-center gap-0 mb-4">
                  {statusSteps.map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold ${
                          i <= stepIndex
                            ? "bg-forest text-white"
                            : "bg-stone/10 text-stone"
                        }`}
                      >
                        {i + 1}
                      </div>
                      {i < statusSteps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-1 rounded-full ${
                            i < stepIndex ? "bg-forest" : "bg-stone/10"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-stone px-0.5">
                  {statusSteps.map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-stone/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={order.items[0].listing.images[0]}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm text-charcoal line-clamp-1">
                        {order.items[0].listing.title}
                      </p>
                      <p className="text-xs text-stone">
                        Qty: {order.items[0].quantity} · {order.logistics}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-semibold text-charcoal">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold text-charcoal">
            Saved Items
          </h2>
          <Link
            href="/buyer/saved"
            className="text-sm font-medium text-forest hover:text-forest-light transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {savedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
