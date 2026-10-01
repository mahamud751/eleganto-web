"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/lib/products";

export type CartLine = { slug: string; size: string; color: string; qty: number; product: import("@/lib/products").Product };

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (product: import("@/lib/products").Product, size: string, color: string, qty?: number) => void;
  setQty: (slug: string, size: string, color: string, qty: number) => void;
  remove: (slug: string, size: string, color: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "eleganto-bag";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]") as CartLine[];
      // read after mount so server and first client render match
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLines(saved.map(l => ({ ...l, color: l.color || l.product?.color?.name || getProduct(l.slug)?.color.name || '', product: l.product || getProduct(l.slug)! })).filter((l) => l.product));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((product: import("@/lib/products").Product, size: string, color: string, qty = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => l.slug === product.slug && l.size === size && l.color === color);
      if (hit) return prev.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { slug: product.slug, size, color, qty, product }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, size: string, color: string, qty: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.slug === slug && l.size === size && l.color === color ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const remove = useCallback((slug: string, size: string, color: string) => {
    setLines((prev) => prev.filter((l) => !(l.slug === slug && l.size === size && l.color === color)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
    return { lines, count, subtotal, open, setOpen, add, setQty, remove, clear };
  }, [lines, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
