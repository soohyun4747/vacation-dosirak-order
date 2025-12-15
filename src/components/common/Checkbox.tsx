'use client';

import { InputHTMLAttributes } from 'react';

const cn = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' ');

export const Checkbox = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="checkbox"
    className={cn(
      'h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 focus:ring-2 focus:ring-offset-0',
      className,
    )}
    {...props}
  />
);
