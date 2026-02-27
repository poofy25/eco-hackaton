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
        <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-black-300">
            <div className="flex items-center justify-around h-16 max-w-7xl mx-auto border-x border-black-300">
                {navItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center flex-1 h-full border-x border-black-900 bg-[#FED601] hover:bg-black-900 hover:text-[#FED601] transition-colors text-black-900"
                            >
                                <Icon className="h-5 w-5 mb-1" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">
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
                                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                                idx !== 0 && "border-l border-black-300/10", // subtle grid lines between items
                                isActive ? "text-black-900 bg-black-900/5" : "text-black-500 hover:bg-black-900/5 hover:text-black-900"
                            )}
                        >
                            <Icon className="h-5 w-5 mb-1" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area padding for notched devices */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white border-x border-black-300 max-w-7xl mx-auto" />
        </nav>
    );
}
