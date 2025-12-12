'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (menu: MenuItem, quantity?: number) => void;
  updateQuantity: (menuId: string, quantity: number) => void;
  removeItem: (menuId: string) => void;
  clear: () => void;
  subtotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menu: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.menu.id === menu.id);
      if (existing) {
        return prev.map((item) =>
          item.menu.id === menu.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...prev, { menu, quantity }];
    });
  };

  const updateQuantity = (menuId: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.menu.id === menuId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (menuId: string) => setItems((prev) => prev.filter((item) => item.menu.id !== menuId));
  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.menu.price * item.quantity, 0),
    [items],
  );
  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = { items, addToCart, updateQuantity, removeItem, clear, subtotal, totalCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
