"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/buyer", icon: LayoutDashboard, label: "Overview" },
  { href: "/buyer/orders", icon: ShoppingBag, label: "Order History" },
  { href: "/buyer/saved", icon: Heart, label: "Saved Items" },
];

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sage rounded-r-2xl min-h-[calc(100vh-4rem)]">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-5 w-5 text-white/80" strokeWidth={1.5} />
            <span className="font-heading text-base font-semibold text-white">
              Buyer Dashboard
            </span>
          </div>
          <p className="text-xs text-white/50">
            Track orders and saved items
          </p>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-terracotta"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Mobile nav */}
        <div className="lg:hidden flex items-center gap-1 px-4 py-3 border-b border-stone/10 bg-chalk overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                  isActive ? "bg-sage text-white" : "text-stone hover:bg-sand"
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
