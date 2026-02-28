import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common" });
    return {
        title: "Salvio — Construction Materials Marketplace",
        description:
            "The marketplace for surplus construction materials. Buy for less. Sell what's left. Save the planet in the process.",
        icons: { icon: "/favicon.png" },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <AuthProvider>
                <CartProvider>
                    <ToastProvider>
                        <Navbar />
                        <main className="pt-16 pb-20 sm:pb-0 min-h-screen">
                            {children}
                        </main>
                        <BottomNav />
                    </ToastProvider>
                </CartProvider>
            </AuthProvider>
        </NextIntlClientProvider>
    );
}
