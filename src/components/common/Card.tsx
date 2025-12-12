import { ReactNode } from 'react';

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-100 bg-white p-4 shadow-sm ${className ?? ''}`}>{children}</div>
);
