"use client";

import { Home, Search, ScanBarcode, Package, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function BottomNav() {
    const t = useTranslations("nav.bottomNav");
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: t("home") },
        { href: "/browse", icon: Search, label: t("search") },
        { href: "/scan", icon: ScanBarcode, label: t("scan"), isCenter: true },
        { href: "/dashboard/orders", icon: Package, label: t("orders") },
        { href: "/dashboard", icon: UserCircle, label: t("profile") },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-white -500-200">
            <div className="flex items-center justify-around h-16 max-w-7xl mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center flex-1 h-full bg-mercury-900 text-white hover:opacity-90 transition-colors"
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
                                isActive ? "text-mercury-900" : "text-mercury-500 hover:text-mercury-900"
                            )}
                        >
                            {isActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-5 bg-yellow-sea-500 " />}
                            <Icon className="h-5 w-5 mb-1" strokeWidth={1.5} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="h-[env(safe-area-inset-bottom)] bg-white max-w-7xl mx-auto" />
        </nav>
    );
}
