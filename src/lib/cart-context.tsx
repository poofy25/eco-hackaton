"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Listing } from "./mock-data";

export interface CartItem {
  listing: Listing;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (listing: Listing, quantity?: number) => void;
  removeItem: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const SERVICE_FEE_RATE = 0.075;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((listing: Listing, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.listing.id === listing.id);
      if (existing) {
        return prev.map((item) =>
          item.listing.id === listing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { listing, quantity }];
    });
  }, []);

  const removeItem = useCallback((listingId: string) => {
    setItems((prev) => prev.filter((item) => item.listing.id !== listingId));
  }, []);

  const updateQuantity = useCallback((listingId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.listing.id !== listingId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.listing.id === listingId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.listing.price * item.quantity,
    0
  );
  const serviceFee = subtotal * SERVICE_FEE_RATE;
  const total = subtotal + serviceFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        serviceFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
