"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ScanBarcode, Package, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", icon: Home, label: "Acasă" },
    { href: "/browse", icon: Search, label: "Caută" },
    { href: "/scan", icon: ScanBarcode, label: "Scanează", isCenter: true },
    { href: "/dashboard/orders", icon: Package, label: "Comenzi" },
    { href: "/dashboard", icon: UserCircle, label: "Profil" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white border-t border-stone-200">
            <div className="flex items-center justify-around h-16 max-w-7xl mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center flex-1 h-full bg-forest text-white hover:opacity-90 transition-colors"
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
                                "relative flex flex-col items-center justify-center flex-1 h-full transition-colors",
                                isActive ? "text-charcoal" : "text-stone hover:text-charcoal"
                            )}
                        >
                            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-accent rounded-full" />}
                            <Icon className="h-5 w-5 mb-1" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
            {/* Safe area padding for notched devices */}
            <div className="h-[env(safe-area-inset-bottom)] bg-white max-w-7xl mx-auto" />
        </nav>
    );
}
