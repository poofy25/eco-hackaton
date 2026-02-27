import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <div className="rounded-xl bg-chalk p-5 shadow-warm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-stone uppercase tracking-wider">
          {label}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/5">
          <Icon className="h-4 w-4 text-forest" strokeWidth={1.5} />
        </div>
      </div>
      <p className="font-heading text-2xl font-bold text-charcoal font-mono tracking-tight">
        {value}
      </p>
      {trend && (
        <p
          className={`mt-1 text-xs font-medium ${
            trendUp ? "text-eco-green" : "text-terracotta"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
    </div>
  );
}
