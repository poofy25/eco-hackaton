"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Package, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/browse", icon: Search, label: "Browse" },
  { href: "/dashboard/new-listing", icon: PlusCircle, label: "Sell", isCenter: true },
  { href: "/buyer/orders", icon: Package, label: "Orders" },
  { href: "/dashboard", icon: UserCircle, label: "Profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-stone/15 bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest shadow-warm-lg">
                  <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-forest mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-colors",
                isActive ? "text-forest" : "text-stone"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for notched devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
