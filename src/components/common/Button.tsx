'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const cn = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const base =
  'inline-flex items-center justify-center rounded-lg border text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-amber-500 text-white border-amber-500 hover:bg-amber-600 focus-visible:outline-amber-600 shadow-sm',
  secondary:
    'bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:text-amber-800 focus-visible:outline-amber-500 shadow-sm',
  ghost:
    'bg-transparent text-gray-700 border-transparent hover:bg-amber-50 focus-visible:outline-amber-500',
};

export const Button = ({ variant = 'primary', className, ...props }: Props) => (
  <button className={cn(base, variantStyles[variant], className, 'px-4 py-2')} {...props} />
);

export const IconButton = ({ variant = 'ghost', className, ...props }: Props) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-full p-2 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
