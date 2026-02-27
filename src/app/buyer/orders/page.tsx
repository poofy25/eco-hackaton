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

export default function BuyerOrdersPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-8">
        Order History
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
                  Items
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Seller
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Date
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-stone uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-stone uppercase tracking-wider">
                  Total
                </th>
                <th className="px-5 py-3 text-right text-xs font-medium text-stone uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone/10">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-sand/30 transition-colors"
                >
                  <td className="px-5 py-4 font-mono text-sm text-charcoal">
                    {order.orderNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.items[0].listing.images[0]}
                        alt=""
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm text-charcoal line-clamp-1 max-w-[200px]">
                          {order.items[0].listing.title}
                        </p>
                        <p className="text-xs text-stone">
                          Qty: {order.items[0].quantity}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-charcoal">
                    {order.seller.name}
                  </td>
                  <td className="px-5 py-4 text-sm text-stone whitespace-nowrap">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-sm font-medium text-charcoal">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {order.status === "completed" && (
                      <button className="text-xs font-medium text-forest hover:text-forest-light transition-colors">
                        Leave Review
                      </button>
                    )}
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
