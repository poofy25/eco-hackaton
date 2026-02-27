"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  X,
  Plus,
  Leaf,
  Eye,
} from "lucide-react";
import { categories } from "@/lib/mock-data";
import { useToast } from "@/components/Toast";

const conditions = ["New Surplus", "Lightly Used", "As-Is", "Salvage"];

export default function NewListingPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [pricingMode, setPricingMode] = useState<"sell" | "free">("sell");
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) =>
    setSpecs(specs.filter((_, i) => i !== index));

  const handlePublish = () => {
    showToast("Listing published successfully!");
    router.push("/dashboard/listings");
  };

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-2">
        List a New Item
      </h1>
      <p className="text-sm text-stone mb-8">
        Fill in the details below to list your surplus materials.
      </p>

      {/* Photos */}
      <section className="mb-8">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-3">
          Photos
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone/25 bg-sand/50 hover:bg-sand hover:border-forest/30 transition-colors">
            <Upload className="h-6 w-6 text-stone mb-1" strokeWidth={1.5} />
            <span className="text-xs text-stone">Add Photos</span>
            <span className="text-[10px] text-stone/60 mt-0.5">Up to 8</span>
            <input type="file" multiple accept="image/*" className="hidden" />
          </label>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-stone/5 border border-stone/10"
            />
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="mb-8">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-3">
          Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-stone uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g., Douglas Fir 2×6 Framing Lumber"
              className="mt-1.5 w-full rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone uppercase tracking-wider">
                Category
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-stone uppercase tracking-wider">
                Condition
              </label>
              <select className="mt-1.5 w-full rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20">
                <option value="">Select condition</option>
                {conditions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone uppercase tracking-wider">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe the material, its history, and why you're selling..."
              className="mt-1.5 w-full rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40 resize-none"
            />
            <p className="mt-1 text-right text-[10px] text-stone">0 / 2000</p>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mb-8">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-3">
          Specifications
        </h2>
        <div className="space-y-2">
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Material"
                value={spec.key}
                onChange={(e) => {
                  const updated = [...specs];
                  updated[i].key = e.target.value;
                  setSpecs(updated);
                }}
                className="flex-1 rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
              <input
                type="text"
                placeholder="e.g., Douglas Fir"
                value={spec.value}
                onChange={(e) => {
                  const updated = [...specs];
                  updated[i].value = e.target.value;
                  setSpecs(updated);
                }}
                className="flex-1 rounded-lg border border-stone/20 bg-chalk px-3 py-2 text-sm placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-forest/20"
              />
              {specs.length > 1 && (
                <button
                  onClick={() => removeSpec(i)}
                  className="p-2 text-stone hover:text-terracotta transition-colors"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addSpec}
            className="flex items-center gap-1.5 text-sm font-medium text-forest hover:text-forest-light transition-colors"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add another spec
          </button>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-8">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-3">
          Pricing
        </h2>
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setPricingMode("sell")}
            className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${
              pricingMode === "sell"
                ? "border-forest bg-forest/5 text-forest"
                : "border-stone/15 text-stone hover:bg-sand"
            }`}
          >
            Sell
          </button>
          <button
            onClick={() => setPricingMode("free")}
            className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-colors ${
              pricingMode === "free"
                ? "border-eco-green bg-eco-green/5 text-eco-green"
                : "border-stone/15 text-stone hover:bg-sand"
            }`}
          >
            Give Away Free
          </button>
        </div>

        {pricingMode === "free" && (
          <div className="rounded-lg bg-eco-green/5 border border-eco-green/15 p-3 flex items-center gap-2 mb-4">
            <Leaf className="h-4 w-4 text-eco-green shrink-0" strokeWidth={1.5} />
            <p className="text-xs text-charcoal">
              Free listings get <span className="font-semibold">3× more visibility</span> in search results!
            </p>
          </div>
        )}

        {pricingMode === "sell" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone uppercase tracking-wider">
                Price (per unit)
              </label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone">$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-lg border border-stone/20 bg-chalk pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-stone uppercase tracking-wider">
                Original Retail Price
              </label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-stone">$</span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="Optional"
                  className="w-full rounded-lg border border-stone/20 bg-chalk pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <label className="text-xs font-medium text-stone uppercase tracking-wider">
            Quantity
          </label>
          <div className="grid grid-cols-2 gap-4 mt-1.5">
            <input
              type="number"
              placeholder="e.g., 50"
              className="rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            <input
              type="text"
              placeholder="Unit (e.g., pieces, sq ft)"
              className="rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="mb-8">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-3">
          Location & Logistics
        </h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Address or ZIP Code"
            defaultValue="Portland, OR 97201"
            className="w-full rounded-lg border border-stone/20 bg-chalk px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
          <div className="space-y-2">
            {["Pickup available", "Delivery available", "Shipping available"].map(
              (option) => (
                <label key={option} className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={option === "Pickup available"}
                    className="rounded border-stone/30 text-forest focus:ring-forest/20 h-4 w-4"
                  />
                  <span className="text-sm text-charcoal">{option}</span>
                </label>
              )
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-3 pb-8">
        <button className="flex items-center gap-2 rounded-lg border border-stone/20 px-6 py-3 text-sm font-medium text-stone hover:bg-sand transition-colors">
          <Eye className="h-4 w-4" strokeWidth={1.5} />
          Preview
        </button>
        <button
          onClick={handlePublish}
          className="btn-magnetic btn-cta flex-1 rounded-lg bg-forest py-3 font-heading text-sm font-semibold text-white shadow-warm-md"
        >
          Publish Listing
        </button>
      </div>
    </div>
  );
}
