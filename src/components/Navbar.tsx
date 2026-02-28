"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, LayoutDashboard, Settings, PlusCircle, LogOut, User, Globe, ChevronDown, Search } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
    const t = useTranslations("nav");
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const locale = useLocale();
    const [currentLang, setCurrentLang] = useState(locale.toUpperCase());
    const [searchValue, setSearchValue] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const { itemCount } = useCart();
    const { user, isAuthenticated } = useAuth();

    const placeholders = [
        t("searchPlaceholders.materials"),
        t("searchPlaceholders.lumber"),
        t("searchPlaceholders.steel"),
        t("searchPlaceholders.concrete"),
    ];

    const setLocale = (locale: "ro" | "en" | "ru") => {
        setCurrentLang(locale.toUpperCase());
        setLangMenuOpen(false);
        router.replace(pathname || "/", { locale });
    };

    useEffect(() => {
        setCurrentLang(locale.toUpperCase());
    }, [locale]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-mercury-200">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8 gap-2">
                {/* Left side: Logo + Search */}
                <div className="flex items-center flex-1 gap-4 sm:gap-6 min-w-0">
                    <Link href="/" className="flex items-center shrink-0">
                        <img src="/logo.svg" alt="Salvio Logo" className="h-6 w-auto object-contain" />
                    </Link>

                    {/* Search Bar — Desktop */}
                    <div className="hidden sm:block relative flex-1 max-w-md w-full">
                        {!searchValue && (
                            <div className="absolute left-3 top-0 bottom-0 pointer-events-none flex items-center overflow-hidden w-[calc(100%-3.5rem)]">
                                <div className="relative w-full h-[1.25em]">
                                    {placeholders.map((text, i) => {
                                        const isActive = i === placeholderIndex;
                                        const isPrev = i === (placeholderIndex - 1 + placeholders.length) % placeholders.length;
                                        let yOffset = "translate-y-full";
                                        let opacity = "opacity-0";
                                        let zIndex = 0;
                                        if (isActive) {
                                            yOffset = "translate-y-0";
                                            opacity = "opacity-100";
                                            zIndex = 10;
                                        } else if (isPrev) {
                                            yOffset = "-translate-y-full";
                                            opacity = "opacity-0";
                                        }
                                        return (
                                            <span
                                                key={i}
                                                className={`absolute left-0 top-0 transition-all duration-500 ease-in-out text-mercury-500 text-sm ${yOffset} ${opacity}`}
                                                style={{ zIndex }}
                                            >
                                                {text}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full border border-mercury-200 bg-white py-2 pl-3 pr-10 text-sm text-mercury-900 focus:outline-none focus:border-mercury-500 transition-colors h-9"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-mercury-900 text-white h-7 w-7 flex items-center justify-center hover:opacity-90 transition-colors ">
                            <Search className="h-3.5 w-3.5" strokeWidth={2} />
                        </button>
                    </div>

                </div>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                    <Link
                        href="/browse"
                        className="px-3 py-1.5 text-sm font-normal text-mercury-900 hover:text-mercury-900 transition-colors "
                    >
                        {t("materials")}
                    </Link>
                    <Link
                        href="/demolitions"
                        className="px-3 py-1.5 text-sm font-normal text-mercury-900 hover:text-mercury-900 transition-colors "
                    >
                        {t("demolitions")}
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex h-9 items-center justify-center gap-1.5 border border-mercury-200 bg-white px-2.5 hover:bg-mercury-900 hover:text-white transition-colors group "
                            aria-label={t("selectLanguage")}
                        >
                            <Globe className="h-4 w-4 text-mercury-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <span className="font-bold text-xs text-mercury-900 group-hover:text-white transition-colors uppercase hidden sm:inline-block">{currentLang}</span>
                            <ChevronDown className="h-3 w-3 text-mercury-500 group-hover:text-white transition-colors hidden sm:inline-block" strokeWidth={2} />
                        </button>
                        {langMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 z-50 w-44 bg-white border border-mercury-200 py-1">
                                    <button
                                        onClick={() => setLocale("ro")}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "RO" ? "font-bold text-mercury-900" : "text-mercury-900"} hover:bg-mercury-900 hover:text-white`}
                                    >
                                        {t("languages.ro")}
                                    </button>
                                    <button
                                        onClick={() => setLocale("en")}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "EN" ? "font-bold text-mercury-900" : "text-mercury-900"} hover:bg-mercury-900 hover:text-white`}
                                    >
                                        {t("languages.en")}
                                    </button>
                                    <button
                                        onClick={() => setLocale("ru")}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "RU" ? "font-bold text-mercury-900" : "text-mercury-900"} hover:bg-mercury-900 hover:text-white`}
                                    >
                                        {t("languages.ru")}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Scan placeholder */}

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative flex h-9 w-9 items-center justify-center border border-mercury-200 bg-white hover:bg-mercury-900 hover:text-white transition-colors group "
                        aria-label={t("cart")}
                    >
                        <ShoppingCart className="h-4 w-4 text-mercury-900 group-hover:text-white" strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-yellow-sea-500 text-[10px] font-bold text-mercury-900 ">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User Menu */}
                    {isAuthenticated && user ? (
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex h-9 w-9 items-center justify-center overflow-hidden border border-mercury-200 bg-white hover:opacity-80 transition-opacity "
                            >
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white border border-mercury-200 py-2">
                                        <div className="px-4 py-2 border border-mercury-200 mb-2">
                                            <p className="font-semibold text-sm text-mercury-900">{user.name}</p>
                                            <p className="text-xs text-mercury-500">{user.email}</p>
                                        </div>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-mercury-900 hover:bg-mercury-900 hover:text-white mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> {t("dashboard")}
                                        </Link>
                                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-4 py-2 text-sm text-mercury-900 hover:bg-mercury-900 hover:text-white mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> {t("addListing")}
                                        </Link>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-mercury-900 hover:bg-mercury-900 hover:text-white mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <Settings className="h-4 w-4" strokeWidth={1.5} /> {t("settings")}
                                        </Link>
                                        <div className="border border-mercury-200 mt-2 pt-2">
                                            <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-mercury-900 hover:bg-mercury-900 hover:text-white mx-1">
                                                <LogOut className="h-4 w-4" strokeWidth={1.5} /> {t("logout")}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-1.5 bg-mercury-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-colors "
                        >
                            {t("login")}
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden flex h-9 w-9 items-center justify-center border border-mercury-200 bg-white hover:bg-mercury-900 hover:text-white transition-colors "
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={t("menu")}
                    >
                        {menuOpen ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Search — always visible below navbar */}
            <div className="sm:hidden border-b border-mercury-200 bg-white px-4 py-2">
                <div className="relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="w-full border border-mercury-200 bg-white py-2 pl-3 pr-10 text-sm text-mercury-900 focus:outline-none focus:border-mercury-500"
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-mercury-900 text-white h-7 w-7 flex items-center justify-center">
                        <Search className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden border border-mercury-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-3 space-y-1">
                        <Link href="/demolitions" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-mercury-900 hover:bg-mercury-900 hover:text-white " onClick={() => setMenuOpen(false)}>
                            {t("demolitions")}
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-mercury-900 hover:bg-mercury-900 hover:text-white " onClick={() => setMenuOpen(false)}>
                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> {t("dashboard")}
                        </Link>
                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-mercury-900 hover:bg-mercury-900 hover:text-white " onClick={() => setMenuOpen(false)}>
                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> {t("addListing")}
                        </Link>
                        <Link href="/login" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-mercury-900 hover:bg-mercury-900 hover:text-white " onClick={() => setMenuOpen(false)}>
                            <User className="h-4 w-4" strokeWidth={1.5} /> {t("login")}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
