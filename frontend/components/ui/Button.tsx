import React from 'react';
import { transitions, shadows } from '@/lib/design-system';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 shadow-primary focus:ring-teal-500',
  secondary: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 shadow-secondary focus:ring-amber-500',
  accent: 'bg-gradient-to-r from-rose-500 to-pink-1000 text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 shadow-accent focus:ring-rose-500',
  outline: 'bg-white text-teal-700 border-2 border-teal-700 hover:bg-teal-50 hover:shadow-md focus:ring-teal-500',
  ghost: 'bg-transparent text-teal-700 hover:bg-teal-50 focus:ring-teal-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 md:px-4 md:py-2 text-sm',
  md: 'px-4 py-2 md:px-6 md:py-3 text-sm md:text-base',
  lg: 'px-6 py-2.5 md:px-8 md:py-4 text-base md:text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = `rounded-xl font-semibold ${transitions.smooth} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const widthStyles = fullWidth ? 'w-full' : 'w-auto';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
