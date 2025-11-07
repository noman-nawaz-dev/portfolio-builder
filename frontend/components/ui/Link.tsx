import React from 'react';
import NextLink from 'next/link';

export type LinkVariant = 'default' | 'primary' | 'secondary' | 'subtle' | 'nav';
export type LinkSize = 'sm' | 'md' | 'lg';

interface LinkProps {
  href: string;
  variant?: LinkVariant;
  size?: LinkSize;
  external?: boolean;
  underline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<LinkVariant, string> = {
  default: 'text-indigo-600 hover:text-indigo-700',
  primary: 'text-indigo-600 hover:text-indigo-800 font-semibold',
  secondary: 'text-gray-600 hover:text-gray-900',
  subtle: 'text-gray-500 hover:text-gray-700',
  nav: 'text-gray-700 hover:text-indigo-600 font-medium',
};

const sizeStyles: Record<LinkSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Link: React.FC<LinkProps> = ({
  href,
  variant = 'default',
  size = 'md',
  external = false,
  underline = false,
  className = '',
  children,
}) => {
  const baseStyles = 'transition-colors duration-200';
  const underlineStyles = underline ? 'underline hover:no-underline' : '';

  const linkClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${underlineStyles} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={linkClassName}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={linkClassName}>
      {children}
    </NextLink>
  );
};
