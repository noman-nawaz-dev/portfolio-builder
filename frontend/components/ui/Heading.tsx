import React from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type HeadingAlign = 'left' | 'center' | 'right';

interface HeadingProps {
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  align?: HeadingAlign;
  gradient?: boolean;
  className?: string;
  children: React.ReactNode;
}

const sizeStyles: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl sm:text-4xl',
  '4xl': 'text-4xl sm:text-5xl',
  '5xl': 'text-5xl sm:text-6xl lg:text-7xl',
};

const weightStyles: Record<HeadingWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const alignStyles: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  size = 'xl',
  weight = 'bold',
  align = 'left',
  gradient = false,
  className = '',
  children,
}) => {
  const baseStyles = 'text-neutral-900';
  const gradientStyles = gradient
    ? 'bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-500 bg-clip-text text-transparent'
    : '';

  return (
    <Component
      className={`${baseStyles} ${sizeStyles[size]} ${weightStyles[weight]} ${alignStyles[align]} ${gradientStyles} ${className}`}
    >
      {children}
    </Component>
  );
};
