"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { variants } from "@/data/catalog";

export interface CartEntry {
  variantId: string;
  quantity: number;
}

interface CartContextValue {
  entries: CartEntry[];
  isReady: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "marketlane-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setEntries(JSON.parse(saved) as CartEntry[]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = entries.reduce(
      (total, entry) => total + entry.quantity,
      0,
    );
    const subtotal = entries.reduce((total, entry) => {
      const variant = variants.find(({ id }) => id === entry.variantId);
      return total + (variant?.price ?? 0) * entry.quantity;
    }, 0);

    return {
      entries,
      isReady,
      itemCount,
      subtotal,
      addItem(variantId) {
        const variant = variants.find(({ id }) => id === variantId);
        if (!variant || variant.stock.quantityAvailable < 1) return;
        setEntries((current) => {
          const existing = current.find(
            (entry) => entry.variantId === variantId,
          );
          if (existing) {
            return current.map((entry) =>
              entry.variantId === variantId
                ? {
                    ...entry,
                    quantity: Math.min(
                      entry.quantity + 1,
                      variant.stock.quantityAvailable,
                    ),
                  }
                : entry,
            );
          }
          return [...current, { variantId, quantity: 1 }];
        });
      },
      setQuantity(variantId, quantity) {
        const variant = variants.find(({ id }) => id === variantId);
        if (quantity <= 0 || !variant) {
          setEntries((current) =>
            current.filter((entry) => entry.variantId !== variantId),
          );
          return;
        }
        setEntries((current) =>
          current.map((entry) =>
            entry.variantId === variantId
              ? {
                  ...entry,
                  quantity: Math.min(quantity, variant.stock.quantityAvailable),
                }
              : entry,
          ),
        );
      },
      removeItem(variantId) {
        setEntries((current) =>
          current.filter((entry) => entry.variantId !== variantId),
        );
      },
      clearCart() {
        setEntries([]);
      },
    };
  }, [entries, isReady]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
