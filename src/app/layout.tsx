import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Salvio — Construction Materials Marketplace",
    description:
        "The marketplace for surplus construction materials. Buy for less. Sell what's left. Save the planet in the process.",
    icons: { icon: "/favicon.png" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ro" suppressHydrationWarning>
            <body className="antialiased bg-white text-mercury-900">
                {children}
            </body>
        </html>
    );
}
