"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Bell,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
  Leaf,
  LayoutDashboard,
  Settings,
  PlusCircle,
  LogOut,
  User,
  Package,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-stone/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest">
            <Leaf className="h-4 w-4 text-white" strokeWidth={1.5} />
          </div>
          <span className="font-heading text-xl font-bold text-forest tracking-tight">
            Salvio
          </span>
        </Link>

        {/* Search Bar — Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search 10,000+ materials..."
              className="w-full rounded-lg border border-stone/20 bg-sand/50 py-2 pl-10 pr-32 text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-md bg-chalk px-3 py-1 text-xs font-medium text-stone border border-stone/15 hover:bg-sand/80 transition-colors">
              All Categories
              <ChevronDown className="h-3 w-3" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand transition-colors"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
          </button>

          {/* Location — Desktop */}
          <button className="hidden lg:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-stone hover:bg-sand transition-colors">
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            <span>Portland, OR</span>
          </button>

          {/* Notifications */}
          <button
            className="relative hidden sm:flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-terracotta" />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta text-[10px] font-semibold text-white min-w-[18px] h-[18px]">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu — Desktop */}
          {isAuthenticated && user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-transparent hover:ring-forest/20 transition-all"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </button>
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl bg-chalk border border-stone/10 shadow-warm-lg py-2">
                    <div className="px-4 py-2 border-b border-stone/10">
                      <p className="font-medium text-sm text-charcoal">{user.name}</p>
                      <p className="text-xs text-stone">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-sand transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4 text-stone" strokeWidth={1.5} />
                      Seller Dashboard
                    </Link>
                    <Link
                      href="/buyer"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-sand transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 text-stone" strokeWidth={1.5} />
                      Buyer Dashboard
                    </Link>
                    <Link
                      href="/dashboard/new-listing"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-sand transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <PlusCircle className="h-4 w-4 text-stone" strokeWidth={1.5} />
                      List an Item
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-sand transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 text-stone" strokeWidth={1.5} />
                      Settings
                    </Link>
                    <div className="border-t border-stone/10 mt-1 pt-1">
                      <button className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-charcoal hover:bg-sand transition-colors">
                        <LogOut className="h-4 w-4 text-stone" strokeWidth={1.5} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-forest px-4 py-2 text-sm font-medium text-white hover:bg-forest-light transition-colors"
            >
              <User className="h-4 w-4" strokeWidth={1.5} />
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="sm:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-sand transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden border-t border-stone/10 bg-white/95 backdrop-blur-xl px-4 py-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search materials..."
              autoFocus
              className="w-full rounded-lg border border-stone/20 bg-sand/50 py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-stone/10 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-sand"
              onClick={() => setMenuOpen(false)}
            >
              <LayoutDashboard className="h-4 w-4 text-stone" strokeWidth={1.5} />
              Dashboard
            </Link>
            <Link
              href="/dashboard/new-listing"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-sand"
              onClick={() => setMenuOpen(false)}
            >
              <PlusCircle className="h-4 w-4 text-stone" strokeWidth={1.5} />
              List an Item
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-charcoal hover:bg-sand"
              onClick={() => setMenuOpen(false)}
            >
              <User className="h-4 w-4 text-stone" strokeWidth={1.5} />
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
