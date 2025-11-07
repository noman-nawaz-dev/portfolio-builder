import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

interface IconProps {
  emoji?: string;
  size?: IconSize;
  color?: IconColor;
  className?: string;
  'aria-label'?: string;
}

const sizeStyles: Record<IconSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
  xl: 'text-3xl',
  '2xl': 'text-5xl',
};

const colorStyles: Record<IconColor, string> = {
  default: '',
  primary: 'text-indigo-600',
  secondary: 'text-gray-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

export const Icon: React.FC<IconProps> = ({
  emoji,
  size = 'md',
  color = 'default',
  className = '',
  'aria-label': ariaLabel,
}) => {
  return (
    <span
      className={`inline-block ${sizeStyles[size]} ${colorStyles[color]} ${className}`}
      role="img"
      aria-label={ariaLabel || emoji}
    >
      {emoji}
    </span>
  );
};
