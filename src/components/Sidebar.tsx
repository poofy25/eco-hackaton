"use client"; import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Package, ShoppingBag, MessageSquare, BarChart3, Settings, Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils"; const navItems = [{ href: "/dashboard", icon: LayoutDashboard, label: "Prezentare" }, { href: "/dashboard/listings", icon: Package, label: "Anunțurile Mele" }, { href: "/dashboard/orders", icon: ShoppingBag, label: "Comenzi" }, { href: "/dashboard/impact", icon: BarChart3, label: "Raport Impact" },
]; export default function Sidebar() {
    const pathname = usePathname();
    return (
        <aside className="hidden lg:flex w-80 shrink-0 flex-col bg-mercury-50 min-h-[calc(100vh-4rem)] z-20 relative">
            <div className="p-6 mt-4">
                <div className="flex items-center gap-2 mb-1">
                    <Leaf className="h-6 w-6 text-yellow-sea-500" strokeWidth={2} />
                    <span className="font-heading text-lg font-bold text-mercury-900 tracking-tight">
                        Smart<br />Construction
                    </span>
                </div>
                <p className="text-xs text-mercury-500 mt-4 uppercase tracking-widest font-bold">
                    Projects: Komatsu - South Harbor
                </p>
            </div>

            <nav className="flex-1 px-4 mt-6 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-colors relative",
                                isActive
                                    ? "bg-yellow-sea-500 text-mercury-950 shadow-[4px_4px_0px_#1b1b18]"
                                    : "text-mercury-600 hover:bg-mercury-200 hover:text-mercury-900"
                            )}
                        >
                            <Icon className="h-4 w-4" strokeWidth={2} />
                            {item.label}

                            {isActive && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-mercury-950" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 m-4 bg-mercury-200">
                <p className="text-xs text-mercury-800 font-bold mb-2">Need Help?</p>
                <Link href="#" className="text-xs text-yellow-sea-600 font-semibold hover:text-yellow-sea-700 transition" >
                    Visit Support Center
                </Link>
            </div>
        </aside>
    );

}
