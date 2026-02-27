"use client";

import { orders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  ready: "bg-eco-green/10 text-eco-green",
  completed: "bg-forest/10 text-forest",
  cancelled: "bg-terracotta/10 text-terracotta",
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-8">
        Orders
      </h1>

      <div className="rounded-xl bg-chalk shadow-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone/10 bg-sand/30">
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Buyer
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Items
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Logistics
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
                <tr
                  key={order.id}
                  className="hover:bg-sand/30 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4 font-mono text-sm text-charcoal">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={order.buyer.avatar}
                        alt={order.buyer.name}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">
                          {order.buyer.name}
                        </p>
                        <p className="text-xs text-stone">{order.buyer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-charcoal line-clamp-1">
                      {order.items.map((i) => i.listing.title).join(", ")}
                    </p>
                    <p className="text-xs text-stone">
                      Qty: {order.items.reduce((s, i) => s + i.quantity, 0)}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-stone whitespace-nowrap">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-sm text-charcoal capitalize">
                    {order.logistics}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[order.status] || "bg-stone/10 text-stone"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-sm font-medium text-charcoal">
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
