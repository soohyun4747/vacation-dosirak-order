'use client';

import { SelectHTMLAttributes } from 'react';

const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

export const Select = ({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100',
      className,
    )}
    {...props}
  >
    {children}
  </select>
);
