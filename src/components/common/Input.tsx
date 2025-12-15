'use client';

import { InputHTMLAttributes } from 'react';

const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100',
      className,
    )}
    {...props}
  />
);
