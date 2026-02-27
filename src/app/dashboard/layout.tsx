"use client"; import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, BarChart3 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils"; const mobileNavItems = [ { href: "/dashboard", icon: LayoutDashboard, label: "Overview" }, { href: "/dashboard/listings", icon: Package, label: "Listings" }, { href: "/dashboard/orders", icon: ShoppingBag, label: "Orders" }, { href: "/dashboard/impact", icon: BarChart3, label: "Impact" },
]; export default function DashboardLayout({ children,
}: { children: React.ReactNode;
}) { const pathname = usePathname(); return ( <div className="flex min-h-[calc(100vh-4rem)]"> <Sidebar /> <div className="flex-1 min-w-0"> {/* Mobile dashboard nav */} <div className="lg:hidden flex items-center gap-1 px-4 py-3 border-b border-black-500/10 bg-white overflow-x-auto"> {mobileNavItems.map((item) => { const Icon = item.icon; const isActive = pathname === item.href; return ( <Link key={item.href} href={item.href} className={cn( "flex items-center gap-1.5 rounded-none px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors", isActive ? "bg-[#FED601] text-black-900 py-2 border border-black-900" : "text-black-500 hover:bg-white" )} > <Icon className="h-3.5 w-3.5" strokeWidth={1.5} /> {item.label} </Link> ); })} </div> <div className="p-4 sm:p-6 lg:p-8">{children}</div> </div> </div> );
}
