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
  primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus-visible:outline-blue-600',
  secondary: 'bg-white text-blue-700 border-blue-200 hover:border-blue-400 hover:text-blue-800 focus-visible:outline-blue-500',
  ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus-visible:outline-blue-500',
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
