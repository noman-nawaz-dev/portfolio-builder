import React from 'react';

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | '7xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

interface ContainerProps {
  maxWidth?: ContainerMaxWidth;
  padding?: ContainerPadding;
  center?: boolean;
  className?: string;
  children: React.ReactNode;
}

const maxWidthStyles: Record<ContainerMaxWidth, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingStyles: Record<ContainerPadding, string> = {
  none: '',
  sm: 'px-2 py-2',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = '7xl',
  padding = 'md',
  center = true,
  className = '',
  children,
}) => {
  const centerClass = center ? 'mx-auto' : '';

  return (
    <div
      className={`${maxWidthStyles[maxWidth]} ${paddingStyles[padding]} ${centerClass} ${className}`}
    >
      {children}
    </div>
  );
};
