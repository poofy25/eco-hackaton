import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Salvio — Construction Materials Marketplace",
  description:
    "The marketplace for surplus construction materials. Buy for less. Sell what's left. Save the planet in the process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <main className="pt-16 pb-20 sm:pb-0">{children}</main>
              <BottomNav />
            </ToastProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
