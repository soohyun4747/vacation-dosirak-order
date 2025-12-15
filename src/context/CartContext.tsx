'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (menu: MenuItem, quantity: number, deliveryDate: string, deliveryLabel: string) => void;
  updateQuantity: (menuId: string, deliveryDate: string, quantity: number) => void;
  removeItem: (menuId: string, deliveryDate: string) => void;
  clear: () => void;
  subtotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menu: MenuItem, quantity: number, deliveryDate: string, deliveryLabel: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.menu.id === menu.id && item.deliveryDate === deliveryDate);
      if (existing) {
        return prev.map((item) =>
          item.menu.id === menu.id && item.deliveryDate === deliveryDate
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { menu, quantity, deliveryDate, deliveryLabel }];
    });
  };

  const updateQuantity = (menuId: string, deliveryDate: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.menu.id === menuId && item.deliveryDate === deliveryDate
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (menuId: string, deliveryDate: string) =>
    setItems((prev) => prev.filter((item) => item.menu.id !== menuId || item.deliveryDate !== deliveryDate));
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
