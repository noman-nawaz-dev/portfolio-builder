import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-sky-100 text-sky-800',
  neutral: 'bg-neutral-200 text-neutral-700',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
