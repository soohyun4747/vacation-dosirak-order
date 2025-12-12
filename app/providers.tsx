'use client';

import { CartProvider } from '../src/context/CartContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
