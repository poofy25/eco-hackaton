"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Package, ShoppingBag, BarChart3, Calculator, Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Prezentare" },
    { href: "/dashboard/listings", icon: Package, label: "Anunțurile Mele" },
    { href: "/dashboard/orders", icon: ShoppingBag, label: "Comenzi" },
    { href: "/dashboard/calculators", icon: Calculator, label: "Calculatoare" },
    { href: "/dashboard/impact", icon: BarChart3, label: "Raport Impact" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-mercury-200 min-h-[calc(100vh-4rem)]">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                    <Leaf className="h-5 w-5 text-mercury-500" strokeWidth={1.5} />
                    <span className="font-heading text-base font-semibold text-mercury-900">
                        Panou Vânzător
                    </span>
                </div>
                <p className="text-xs text-mercury-500">
                    Gestionează anunțurile și urmărește impactul
                </p>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-mercury-50 text-mercury-900 border-l-2 border-mercury-900"
                                    : "text-mercury-500 hover:bg-mercury-50 hover:text-mercury-900"
                            )}
                        >
                            <Icon className="h-4 w-4" strokeWidth={1.5} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 m-3 bg-mercury-50">
                <p className="text-xs text-mercury-500 mb-2">Ai nevoie de ajutor?</p>
                <Link
                    href="#"
                    className="text-xs text-mercury-900 underline underline-offset-2 hover:opacity-70"
                >
                    Vizitează Centrul de Asistență
                </Link>
            </div>
        </aside>
    );
}
