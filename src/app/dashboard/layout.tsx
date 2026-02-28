"use client"; import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils"; const mobileNavItems = [{ href: "/dashboard", icon: LayoutDashboard, label: "Overview" }, { href: "/dashboard/listings", icon: Package, label: "Listings" }, { href: "/dashboard/orders", icon: ShoppingBag, label: "Orders" }, { href: "/dashboard/impact", icon: BarChart3, label: "Impact" },
]; export default function DashboardLayout({ children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-mercury-950 overflow-hidden relative">

            {/* Dark Canvas Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <Sidebar />

            <div className="flex-1 min-w-0 relative z-10 overflow-y-auto text-mercury-100">
                {/* Mobile dashboard nav */}
                <div className="lg:hidden flex items-center gap-1 px-4 py-3 bg-mercury-900 overflow-x-auto">
                    {mobileNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                                    isActive ? "bg-yellow-sea-500 text-mercury-950" : "text-mercury-400 hover:bg-mercury-800"
                                )}
                            >
                                <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
