"use client";

import { useCountUp } from "@/hooks/useGsap";

const stats = [
  { value: 12450, label: "tons diverted from landfill", suffix: "" },
  { value: 3200000, label: "in materials recirculated", prefix: "$" },
  { value: 4800, label: "active sellers", suffix: "+" },
];

function CounterStat({ value, label, prefix, suffix }: { value: number; label: string; prefix?: string; suffix?: string }) {
  const ref = useCountUp(value, 2.5, true);

  return (
    <div className="flex items-center gap-2 px-4 sm:px-6">
      <span className="font-mono text-lg sm:text-xl font-medium text-white whitespace-nowrap">
        {prefix}
        <span ref={ref}>0</span>
        {suffix}
      </span>
      <span className="text-sm text-white/70">{label}</span>
    </div>
  );
}

export default function ImpactTicker() {
  return (
    <section className="bg-forest py-4">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 sm:divide-x sm:divide-white/20">
          {/* Live indicator */}
          <div className="flex items-center gap-2 pr-4 sm:pr-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-eco-green opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-eco-green" />
            </span>
            <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
              Live
            </span>
          </div>

          {stats.map((stat) => (
            <CounterStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
