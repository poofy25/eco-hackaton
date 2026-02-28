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
        <div className="bg-white p-5 border border-mercury-200">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-mercury-500 uppercase tracking-wider">
                    {label}
                </span>
                <div className="flex h-9 w-9 items-center justify-center bg-mercury-900/5">
                    <Icon className="h-4 w-4 text-mercury-900" strokeWidth={1.5} />
                </div>
            </div>
            <p className="font-heading text-2xl font-bold text-mercury-900 font-mono tracking-tight">
                {value}
            </p>
            {trend && (
                <p
                    className={`mt-1 text-xs font-medium ${
                        trendUp ? "text-eco" : "text-red-500"
                    }`}
                >
                    {trendUp ? "↑" : "↓"} {trend}
                </p>
            )}
        </div>
    );
}
