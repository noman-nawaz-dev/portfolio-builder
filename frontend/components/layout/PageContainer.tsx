import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
};

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  maxWidth = '7xl',
}) => {
  return (
    <div className={`${maxWidthStyles[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${className}`}>
      {children}
    </div>
  );
};
