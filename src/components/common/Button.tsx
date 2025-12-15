'use client';

import { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const cn = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const base =
  'inline-flex items-center justify-center rounded-xl border text-sm font-semibold tracking-tight shadow-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent hover:from-sky-600 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-indigo-600',
  secondary:
    'bg-white text-sky-800 border-sky-200 hover:border-sky-400 hover:bg-sky-50 focus-visible:outline-sky-500 shadow-md shadow-sky-100',
  ghost:
    'bg-transparent text-gray-700 border-transparent hover:bg-sky-50 hover:text-sky-800 focus-visible:outline-sky-500',
};

export const Button = ({ variant = 'primary', className, ...props }: Props) => (
  <button className={cn(base, variantStyles[variant], 'px-5 py-2.5', className)} {...props} />
);

export const IconButton = ({ variant = 'ghost', className, ...props }: Props) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-full p-2 border transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5',
      variantStyles[variant],
      className,
    )}
    {...props}
  />
);
