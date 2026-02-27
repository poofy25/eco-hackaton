"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import CartItem from "@/components/CartItem";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, subtotal, serviceFee, total } = useCart();

  // Group items by seller
  const groupedBySeller = items.reduce(
    (acc, item) => {
      const sellerId = item.listing.seller.id;
      if (!acc[sellerId]) {
        acc[sellerId] = { seller: item.listing.seller, items: [] };
      }
      acc[sellerId].items.push(item);
      return acc;
    },
    {} as Record<string, { seller: typeof items[0]["listing"]["seller"]; items: typeof items }>
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-stone/30" strokeWidth={1} />
        <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-stone">
          Browse materials and add items to your cart.
        </p>
        <Link
          href="/browse"
          className="mt-6 inline-block rounded-lg bg-forest px-6 py-2.5 text-sm font-medium text-white btn-magnetic"
        >
          Browse Materials
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-6 py-8">
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-8">
        Shopping Cart
        <span className="ml-2 text-base font-normal text-stone">
          ({items.length} item{items.length !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items */}
        <div className="flex-1">
          {Object.values(groupedBySeller).map(({ seller, items: sellerItems }) => (
            <div key={seller.id} className="mb-6 rounded-xl bg-chalk p-5 shadow-warm">
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-stone/10">
                <img
                  src={seller.avatar}
                  alt={seller.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-charcoal">{seller.name}</p>
                  <p className="text-xs text-stone">{seller.company}</p>
                </div>
              </div>
              <div className="divide-y divide-stone/10">
                {sellerItems.map((item) => (
                  <CartItem key={item.listing.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="sticky top-20 rounded-xl bg-chalk p-6 shadow-warm">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-stone">Subtotal</span>
                <span className="font-medium text-charcoal">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone flex items-center gap-1">
                  Service fee
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-stone/30 text-[10px] text-stone cursor-help"
                    title="This fee keeps Salvio running and funds our ecological initiatives"
                  >
                    ?
                  </span>
                </span>
                <span className="font-medium text-charcoal">
                  {formatPrice(serviceFee)}
                </span>
              </div>
              <div className="border-t border-stone/10 pt-3 flex justify-between">
                <span className="font-semibold text-charcoal">Estimated Total</span>
                <span className="font-heading text-lg font-bold text-charcoal">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-magnetic btn-cta mt-6 block w-full rounded-lg bg-terracotta py-3.5 text-center font-heading text-sm font-semibold text-white shadow-warm-md"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs text-stone">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
