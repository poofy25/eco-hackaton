"use client";

import { Leaf, Share2, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { sellers } from "@/lib/mock-data";
import { useCountUp } from "@/hooks/useGsap";

const seller = sellers[0];

const categoryData = [
  { name: "Lumber", kg: 820 },
  { name: "Steel", kg: 540 },
  { name: "Concrete", kg: 380 },
  { name: "Tile", kg: 260 },
  { name: "Electrical", kg: 140 },
  { name: "Plumbing", kg: 120 },
  { name: "Other", kg: 80 },
];

const monthlyData = [
  { month: "Sep", kg: 120 },
  { month: "Oct", kg: 245 },
  { month: "Nov", kg: 380 },
  { month: "Dec", kg: 310 },
  { month: "Jan", kg: 520 },
  { month: "Feb", kg: 765 },
];

export default function ImpactPage() {
  const impactRef = useCountUp(seller.impactKg, 2.5, true);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-charcoal mb-8">
        Impact Report
      </h1>

      {/* Hero Stat */}
      <div className="rounded-xl bg-gradient-to-br from-forest to-sage p-8 sm:p-12 text-center text-white mb-8">
        <Leaf className="mx-auto h-10 w-10 mb-4 opacity-80" strokeWidth={1.5} />
        <p className="text-sm uppercase tracking-widest opacity-70 mb-2">
          Total Materials Diverted from Landfill
        </p>
        <p className="font-heading text-4xl sm:text-5xl font-bold font-mono">
          <span ref={impactRef}>0</span> kg
        </p>
        <p className="mt-3 text-sm opacity-70">
          That&apos;s equivalent to keeping {Math.round(seller.impactKg / 50)} pickup truck loads out of landfills.
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* By Category */}
        <div className="rounded-xl bg-chalk p-6 shadow-warm">
          <h2 className="font-heading text-base font-semibold text-charcoal mb-6">
            Waste Saved by Category
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} width={70} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(27, 67, 50, 0.08)",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`${value} kg`, "Waste Saved"]}
                />
                <Bar dataKey="kg" fill="#1B4332" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Over Time */}
        <div className="rounded-xl bg-chalk p-6 shadow-warm">
          <h2 className="font-heading text-base font-semibold text-charcoal mb-6">
            Monthly Impact
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6B7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgba(27, 67, 50, 0.08)",
                    fontSize: "13px",
                  }}
                  formatter={(value) => [`${value} kg`, "Waste Diverted"]}
                />
                <Line
                  type="monotone"
                  dataKey="kg"
                  stroke="#16A34A"
                  strokeWidth={2.5}
                  dot={{ fill: "#16A34A", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Shareable Badge */}
      <div className="rounded-xl bg-chalk p-6 shadow-warm">
        <h2 className="font-heading text-base font-semibold text-charcoal mb-4">
          Share Your Impact
        </h2>
        <div className="rounded-xl bg-gradient-to-r from-forest to-sage p-6 text-white text-center max-w-sm">
          <Leaf className="mx-auto h-8 w-8 mb-2" strokeWidth={1.5} />
          <p className="font-heading text-lg font-bold mb-1">
            I&apos;ve saved {seller.impactKg.toLocaleString()} kg
          </p>
          <p className="text-sm opacity-80">
            of construction materials from landfill with Salvio
          </p>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-stone/20 px-4 py-2 text-sm font-medium text-charcoal hover:bg-sand transition-colors">
            <Share2 className="h-4 w-4" strokeWidth={1.5} />
            Share on LinkedIn
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-stone/20 px-4 py-2 text-sm font-medium text-charcoal hover:bg-sand transition-colors">
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}
