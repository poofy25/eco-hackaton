"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, LayoutDashboard, Settings, PlusCircle, LogOut, User, Package, Globe, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [langMenuOpen, setLangMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("RO");
    const { itemCount } = useCart();
    const { user, isAuthenticated } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-black-300 bg-[#FAFAFA]/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-6 border-x border-black-300 bg-white/90 backdrop-blur-md">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <span className="font-heading text-2xl font-bold text-black-900 tracking-tight">
                        Salvio
                    </span>
                </Link>

                {/* Removed Search Bar from here to be put into Hero */}

                {/* Right Actions */}
                <div className="flex items-center gap-3">

                    {/* Language Selector */}
                    <div className="relative">
                        <button
                            onClick={() => setLangMenuOpen(!langMenuOpen)}
                            className="flex h-9 items-center justify-center gap-1.5 border border-black-300 bg-white px-2.5 hover:bg-black-900 hover:text-white transition-colors group"
                            aria-label="Select Language"
                        >
                            <Globe className="h-4 w-4 text-black-900 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <span className="font-bold text-xs text-black-900 group-hover:text-white transition-colors uppercase hidden sm:inline-block">{currentLang}</span>
                            <ChevronDown className="h-3 w-3 text-black-500 group-hover:text-white transition-colors hidden sm:inline-block" strokeWidth={2} />
                        </button>
                        {langMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                                <div className="absolute right-0 top-full mt-2 z-50 w-44 bg-white border border-black-300 py-1">
                                    <button
                                        onClick={() => { setCurrentLang("RO"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "RO" ? "font-bold text-black-900" : "text-black-900"} hover:bg-black-900 hover:text-white`}
                                    >
                                        Română (Implicit)
                                    </button>
                                    <button
                                        onClick={() => { setCurrentLang("RU"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "RU" ? "font-bold text-black-900" : "text-black-900"} hover:bg-black-900 hover:text-white`}
                                    >
                                        Rusă
                                    </button>
                                    <button
                                        onClick={() => { setCurrentLang("EN"); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${currentLang === "EN" ? "font-bold text-black-900" : "text-black-900"} hover:bg-black-900 hover:text-white`}
                                    >
                                        Engleză
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Cart */}
                    <Link
                        href="/cart"
                        className="relative flex h-9 w-9 items-center justify-center border border-black-300 bg-white hover:bg-black-900 hover:text-white transition-colors group"
                        aria-label="Cart"
                    >
                        <ShoppingCart className="h-4 w-4 text-black-900 group-hover:text-white" strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center bg-[#FED601] text-[10px] font-bold text-black-900 border border-black-900">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* User Menu */}
                    {isAuthenticated && user ? (
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex h-9 w-9 items-center justify-center overflow-hidden border border-black-300 bg-white hover:opacity-80 transition-opacity"
                            >
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover grayscale" />
                            </button>
                            {userMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                                    <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white border border-black-300 py-2">
                                        <div className="px-4 py-2 border-b border-black-300 mb-2">
                                            <p className="font-semibold text-sm text-black-900">{user.name}</p>
                                            <p className="text-xs text-black-500">{user.email}</p>
                                        </div>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setUserMenuOpen(false)}>
                                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> Panou Vânzător
                                        </Link>
                                        <Link href="/buyer" className="flex items-center gap-2.5 px-4 py-2 text-sm text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setUserMenuOpen(false)}>
                                            <Package className="h-4 w-4" strokeWidth={1.5} /> Panou Cumpărător
                                        </Link>
                                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-4 py-2 text-sm text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setUserMenuOpen(false)}>
                                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> Adaugă Anunț
                                        </Link>
                                        <Link href="/dashboard" className="flex items-center gap-2.5 px-4 py-2 text-sm text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setUserMenuOpen(false)}>
                                            <Settings className="h-4 w-4" strokeWidth={1.5} /> Setări
                                        </Link>
                                        <div className="border-t border-black-300 mt-2 pt-2">
                                            <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-black-900 hover:bg-black-900 hover:text-white">
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
                            className="hidden sm:flex items-center gap-1.5 border border-black-900 bg-black-900 px-4 py-2 text-sm font-semibold text-white hover:bg-[#FED601] hover:text-black-900 transition-colors uppercase"
                        >
                            Autentificare
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="sm:hidden flex h-9 w-9 items-center justify-center border border-black-300 bg-white hover:bg-black-900 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                    >
                        {menuOpen ? <X className="h-4 w-4" strokeWidth={1.5} /> : <Menu className="h-4 w-4" strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Removed Mobile Search Bar */}

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden border-b border-black-300 bg-white">
                    <div className="mx-auto max-w-7xl border-x border-black-300 px-4 py-3 space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setMenuOpen(false)}>
                            <LayoutDashboard className="h-4 w-4" strokeWidth={1.5} /> Panou
                        </Link>
                        <Link href="/dashboard/new-listing" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-black-900 hover:bg-black-900 hover:text-white" onClick={() => setMenuOpen(false)}>
                            <PlusCircle className="h-4 w-4" strokeWidth={1.5} /> Adaugă Anunț
                        </Link>
                        <Link href="/login" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-black-900 hover:bg-[#FED601]" onClick={() => setMenuOpen(false)}>
                            <User className="h-4 w-4" strokeWidth={1.5} /> Autentificare
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
