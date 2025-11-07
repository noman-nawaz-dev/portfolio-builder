import React from 'react';

export type TextVariant = 'body' | 'caption' | 'label' | 'helper' | 'error' | 'success' | 'warning';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextLineHeight = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';

interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label';
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  align?: TextAlign;
  lineHeight?: TextLineHeight;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  body: 'text-gray-600',
  caption: 'text-gray-500 text-sm',
  label: 'text-gray-700 font-medium',
  helper: 'text-gray-500 text-sm',
  error: 'text-red-600 text-sm',
  success: 'text-green-600 text-sm',
  warning: 'text-yellow-600 text-sm',
};

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const weightStyles: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignStyles: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const lineHeightStyles: Record<TextLineHeight, string> = {
  none: 'leading-none',
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  size,
  weight,
  align = 'left',
  lineHeight,
  className = '',
  children,
}) => {
  // Size and weight from variant can be overridden by explicit props
  const sizeClass = size ? sizeStyles[size] : '';
  const weightClass = weight ? weightStyles[weight] : '';
  const lineHeightClass = lineHeight ? lineHeightStyles[lineHeight] : '';

  return (
    <Component
      className={`${variantStyles[variant]} ${sizeClass} ${weightClass} ${alignStyles[align]} ${lineHeightClass} ${className}`}
    >
      {children}
    </Component>
  );
};
