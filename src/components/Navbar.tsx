"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, LayoutDashboard, Settings, PlusCircle, LogOut, User, Globe, ChevronDown, ScanBarcode, Search } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const placeholders = [
    "Caută materiale...",
    "Cherestea...",
    "Oțel...",
    "Beton...",
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("RO");
    const [searchValue, setSearchValue] = useState("");
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const { itemCount } = useCart();
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-stone/20 bg-sand/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-6 bg-white/90 backdrop-blur-md gap-3">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <span className="font-heading text-2xl font-bold text-forest tracking-tight">
                        Salvio
                    </span>
                </Link>

                {/* Search Bar — Desktop */}
                <div className="hidden sm:block relative flex-1 max-w-xl mx-4">
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
                                            className={`absolute left-0 top-0 transition-all duration-500 ease-in-out text-stone text-sm ${yOffset} ${opacity}`}
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
                        className="w-full border border-stone-200 rounded-lg bg-white py-2 pl-3 pr-10 text-sm text-charcoal focus:outline-none focus:ring-0 focus:border-sage transition-colors h-9"
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-forest text-white h-7 w-7 flex items-center justify-center hover:opacity-90 transition-colors rounded-lg">
                        <Search className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex items-center gap-1 shrink-0">
                    <Link
                        href="/browse"
                        className="px-3 py-1.5 text-sm font-semibold text-charcoal hover:text-forest transition-colors rounded-lg"
                    >
                        Materiale
                    </Link>
                    <Link
                        href="/demolitions"
                        className="px-3 py-1.5 text-sm font-semibold text-charcoal hover:text-forest transition-colors rounded-lg"
                    >
                        Demolări
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex h-9 items-center justify-center gap-1.5 border border-stone-200 bg-white px-2.5 hover:bg-forest hover:text-white transition-colors group rounded-lg"
                            aria-label="Select Language"
                        >
                            <Globe className="h-4 w-4 text-charcoal group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <span className="font-bold text-xs text-charcoal group-hover:text-white transition-colors uppercase hidden sm:inline-block">{currentLang}</span>
                            <ChevronDown className="h-3 w-3 text-stone group-hover:text-white transition-colors hidden sm:inline-block" strokeWidth={2} />
                        </button>
                        {langMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 z-50 w-44 bg-white border border-stone-200 rounded-xl py-1">
                                    <button
                                        onClick={() => { setCurrentLang("RO"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-lg ${currentLang === "RO" ? "font-bold text-charcoal" : "text-charcoal"} hover:bg-forest hover:text-white`}
                                    >
                                        Română (Implicit)
                                    </button>
                                    <button
                                        onClick={() => { setCurrentLang("RU"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-lg ${currentLang === "RU" ? "font-bold text-charcoal" : "text-charcoal"} hover:bg-forest hover:text-white`}
                                    >
                                        Rusă
                                    </button>
                                    <button
                                        onClick={() => { setCurrentLang("EN"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-lg ${currentLang === "EN" ? "font-bold text-charcoal" : "text-charcoal"} hover:bg-forest hover:text-white`}
                                    >
                                        Engleză
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Scan */}
                    <Link
                        href="/scan"
                        className="hidden sm:flex relative h-9 w-9 items-center justify-center border border-stone-200 bg-white hover:bg-forest hover:text-white transition-colors group rounded-lg"
                        aria-label="Scanner"
                    >
                        <ScanBarcode className="h-4 w-4 text-charcoal group-hover:text-white" strokeWidth={1.5} />
                    </Link>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative flex h-9 w-9 items-center justify-center border border-stone-200 bg-white hover:bg-forest hover:text-white transition-colors group rounded-lg"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="h-4 w-4 text-charcoal group-hover:text-white" strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-accent text-[10px] font-bold text-charcoal rounded-full">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User Menu */}
                    {isAuthenticated && user ? (
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex h-9 w-9 items-center justify-center overflow-hidden border border-stone-200 bg-white hover:opacity-80 transition-opacity rounded-full"
                            >
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white border border-stone-200 rounded-xl py-2">
                                        <div className="px-4 py-2 border-b border-stone-200 mb-2">
                                            <p className="font-semibold text-sm text-charcoal">{user.name}</p>
                                            <p className="text-xs text-stone">{user.email}</p>
                                        </div>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-forest hover:text-white rounded-lg mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> Panou
                                        </Link>
                                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-forest hover:text-white rounded-lg mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> Adaugă Anunț
                                        </Link>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-forest hover:text-white rounded-lg mx-1" onClick={() => setUserMenuOpen(false)}>
                                            <Settings className="h-4 w-4" strokeWidth={1.5} /> Setări
                                        </Link>
                                        <div className="border-t border-stone-200 mt-2 pt-2">
                                            <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-forest hover:text-white rounded-lg mx-1">
                                                <LogOut className="h-4 w-4" strokeWidth={1.5} /> Deconectare
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-1.5 bg-forest px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-colors rounded-lg"
                        >
                            Autentificare
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden flex h-9 w-9 items-center justify-center border border-stone-200 bg-white hover:bg-forest hover:text-white transition-colors rounded-lg"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        {menuOpen ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden border-b border-stone-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-3 space-y-1">
                        {/* Mobile Search */}
                        <div className="relative mb-2">
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Caută materiale..."
                                className="w-full border border-stone-200 rounded-lg bg-white py-2.5 pl-3 pr-10 text-sm text-charcoal focus:outline-none focus:ring-0 focus:border-sage"
                            />
                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-forest text-white h-7 w-7 flex items-center justify-center rounded-lg">
                                <Search className="h-3.5 w-3.5" strokeWidth={2} />
                            </button>
                        </div>
                        <Link href="/demolitions" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-forest hover:text-white rounded-lg" onClick={() => setMenuOpen(false)}>
                            Demolări
                        </Link>
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-forest hover:text-white rounded-lg" onClick={() => setMenuOpen(false)}>
                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> Panou
                        </Link>
                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-forest hover:text-white rounded-lg" onClick={() => setMenuOpen(false)}>
                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> Adaugă Anunț
                        </Link>
                        <Link href="/login" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-charcoal hover:bg-forest hover:text-white rounded-lg" onClick={() => setMenuOpen(false)}>
                            <User className="h-4 w-4" strokeWidth={1.5} /> Autentificare
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
