import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
    title: "Salvio — Construction Materials Marketplace",
    description: "The marketplace for surplus construction materials. Buy for less. Sell what's left. Save the planet in the process.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased bg-[#FAFAFA] text-black-900`}>
                <AuthProvider>
                    <CartProvider>
                        <ToastProvider>
                            <Navbar />
                            <main className="pt-16 pb-20 sm:pb-0 min-h-screen">{children}</main>
                            <BottomNav />
                        </ToastProvider>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
