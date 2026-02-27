"use client";

import Link from "next/link";
import { Package, DollarSign, ShoppingBag, Leaf, PlusCircle } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { orders, sellers } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

const seller = sellers[0];

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  ready: "bg-eco-green/10 text-eco-green",
  completed: "bg-forest/10 text-forest",
  cancelled: "bg-terracotta/10 text-terracotta",
};

export default function SellerOverview() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">
            Welcome back, {seller.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-stone mt-1">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <Link
          href="/dashboard/new-listing"
          className="btn-magnetic btn-cta flex items-center gap-2 rounded-lg bg-terracotta px-5 py-2.5 text-sm font-semibold text-white shadow-warm-md"
        >
          <PlusCircle className="h-4 w-4" strokeWidth={1.5} />
          List a New Item
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard icon={Package} label="Active Listings" value="12" trend="2 new this week" trendUp />
        <StatsCard icon={DollarSign} label="Total Sales" value={formatPrice(seller.totalSales)} trend="+12% this month" trendUp />
        <StatsCard icon={ShoppingBag} label="Items Sold" value="86" trend="+5 this week" trendUp />
        <StatsCard icon={Leaf} label="Impact" value={`${seller.impactKg.toLocaleString()} kg`} trend="diverted from landfill" trendUp />
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl bg-chalk shadow-warm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-stone/10">
          <h2 className="font-heading text-lg font-semibold text-charcoal">
            Recent Orders
          </h2>
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-forest hover:text-forest-light transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone/10">
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-stone uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-sand/50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-mono text-sm text-charcoal">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.buyer.avatar}
                        alt={order.buyer.name}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <span className="text-sm text-charcoal">{order.buyer.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-stone">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[order.status] || "bg-stone/10 text-stone"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm font-medium text-charcoal">
                    {formatPrice(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
