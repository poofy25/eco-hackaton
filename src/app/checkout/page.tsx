"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Leaf, ArrowLeft } from "lucide-react";
import CheckoutStepper from "@/components/CheckoutStepper";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

const steps = ["Logistics", "Payment", "Review"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, serviceFee, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(
    `SLV-2026-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`
  );

  const allFree = items.every((item) => item.listing.isFree);

  if (items.length === 0 && !orderPlaced) {
    router.push("/cart");
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-eco-green/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-eco-green" strokeWidth={1.5} />
        </div>
        <h1 className="font-heading text-2xl font-bold text-charcoal">
          Order Placed!
        </h1>
        <p className="mt-2 text-stone text-sm">
          Your order has been confirmed successfully.
        </p>
        <p className="mt-4 font-mono text-lg font-medium text-charcoal">
          {orderNumber}
        </p>

        <div className="mt-8 rounded-xl bg-eco-green/5 border border-eco-green/15 p-5">
          <Leaf className="mx-auto h-6 w-6 text-eco-green mb-2" strokeWidth={1.5} />
          <p className="text-sm text-charcoal">
            Your purchase just saved an estimated{" "}
            <span className="font-semibold text-eco-green">142 kg</span> from
            landfill!
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/buyer/orders"
            className="rounded-lg bg-forest px-6 py-2.5 text-sm font-medium text-white btn-magnetic"
          >
            View Orders
          </Link>
          <Link
            href="/browse"
            className="rounded-lg border border-stone/20 px-6 py-2.5 text-sm font-medium text-charcoal hover:bg-sand transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    clearCart();
    setOrderPlaced(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 lg:px-6 py-8">
      <button
        onClick={() => (currentStep === 0 ? router.push("/cart") : setCurrentStep(currentStep - 1))}
        className="flex items-center gap-1.5 text-sm text-stone hover:text-charcoal transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        {currentStep === 0 ? "Back to Cart" : "Back"}
      </button>

      <CheckoutStepper currentStep={currentStep} steps={steps} />

      <div className="mt-10">
        {/* Step 1: Logistics */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Pickup & Delivery
            </h2>
            {items.map((item) => (
              <div key={item.listing.id} className="rounded-xl bg-chalk p-5 shadow-warm">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={item.listing.images[0]}
                    alt={item.listing.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-charcoal line-clamp-1">
                      {item.listing.title}
                    </p>
                    <p className="text-xs text-stone">
                      {item.listing.seller.name} · {item.listing.location}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {item.listing.pickupAvailable && (
                    <label className="flex items-center gap-3 rounded-lg border border-stone/20 p-3 cursor-pointer hover:bg-sand/50 transition-colors">
                      <input
                        type="radio"
                        name={`logistics-${item.listing.id}`}
                        defaultChecked
                        className="text-forest focus:ring-forest/20"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">Pickup</p>
                        <p className="text-xs text-stone">{item.listing.location}</p>
                      </div>
                      <span className="ml-auto text-sm font-medium text-eco-green">Free</span>
                    </label>
                  )}
                  {item.listing.deliveryAvailable && (
                    <label className="flex items-center gap-3 rounded-lg border border-stone/20 p-3 cursor-pointer hover:bg-sand/50 transition-colors">
                      <input
                        type="radio"
                        name={`logistics-${item.listing.id}`}
                        className="text-forest focus:ring-forest/20"
                      />
                      <div>
                        <p className="text-sm font-medium text-charcoal">Delivery</p>
                        <p className="text-xs text-stone">To your address</p>
                      </div>
                      <span className="ml-auto text-sm font-medium text-charcoal">
                        {item.listing.deliveryCost ? formatPrice(item.listing.deliveryCost) : "Free"}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-chalk p-5 shadow-warm">
              <h3 className="text-sm font-semibold text-charcoal mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="rounded-lg border border-stone/20 bg-sand/30 px-4 py-2.5 text-sm placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-lg border border-stone/20 bg-sand/30 px-4 py-2.5 text-sm placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                />
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(allFree ? 2 : 1)}
              className="btn-magnetic btn-cta w-full rounded-lg bg-terracotta py-3.5 font-heading text-sm font-semibold text-white"
            >
              {allFree ? "Review Order" : "Continue to Payment"}
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Payment
            </h2>
            <div className="rounded-xl bg-chalk p-6 shadow-warm">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-stone uppercase tracking-wider">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1.5 w-full rounded-lg border border-stone/20 bg-sand/30 px-4 py-3 text-sm font-mono placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="mt-1.5 w-full rounded-lg border border-stone/20 bg-sand/30 px-4 py-3 text-sm font-mono placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-stone uppercase tracking-wider">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="mt-1.5 w-full rounded-lg border border-stone/20 bg-sand/30 px-4 py-3 text-sm font-mono placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="btn-magnetic btn-cta w-full rounded-lg bg-terracotta py-3.5 font-heading text-sm font-semibold text-white"
            >
              Review Order
            </button>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-bold text-charcoal">
              Review & Place Order
            </h2>

            <div className="rounded-xl bg-chalk p-5 shadow-warm">
              <h3 className="text-sm font-semibold text-charcoal mb-3">Order Items</h3>
              <div className="divide-y divide-stone/10">
                {items.map((item) => (
                  <div key={item.listing.id} className="flex items-center gap-3 py-3">
                    <img
                      src={item.listing.images[0]}
                      alt={item.listing.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal line-clamp-1">
                        {item.listing.title}
                      </p>
                      <p className="text-xs text-stone">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal">
                      {item.listing.isFree ? "FREE" : formatPrice(item.listing.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-chalk p-5 shadow-warm">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone">Subtotal</span>
                  <span className="text-charcoal">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone">Service fee (7.5%)</span>
                  <span className="text-charcoal">{formatPrice(serviceFee)}</span>
                </div>
                <div className="flex justify-between border-t border-stone/10 pt-2 font-semibold">
                  <span className="text-charcoal">Total</span>
                  <span className="font-heading text-lg text-charcoal">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 rounded border-stone/30 text-forest focus:ring-forest/20"
              />
              <span className="text-xs text-stone">
                I agree to the{" "}
                <Link href="#" className="text-forest underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-forest underline">Privacy Policy</Link>.
              </span>
            </label>

            <button
              onClick={handlePlaceOrder}
              className="btn-magnetic btn-cta w-full rounded-lg bg-forest py-3.5 font-heading text-sm font-semibold text-white shadow-warm-md"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
