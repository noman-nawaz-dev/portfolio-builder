import React from 'react';

export type BoxPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type BoxMargin = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

interface BoxProps {
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main';
  padding?: BoxPadding;
  paddingX?: BoxPadding;
  paddingY?: BoxPadding;
  margin?: BoxMargin;
  marginX?: BoxMargin;
  marginY?: BoxMargin;
  bg?: string;
  rounded?: boolean;
  shadow?: boolean;
  className?: string;
  children: React.ReactNode;
}

const paddingStyles: Record<BoxPadding, string> = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
  '3xl': 'p-16',
  '4xl': 'p-20',
};

const paddingXStyles: Record<BoxPadding, string> = {
  none: 'px-0',
  xs: 'px-1',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
  xl: 'px-8',
  '2xl': 'px-12',
  '3xl': 'px-16',
  '4xl': 'px-20',
};

const paddingYStyles: Record<BoxPadding, string> = {
  none: 'py-0',
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
  xl: 'py-8',
  '2xl': 'py-12',
  '3xl': 'py-16',
  '4xl': 'py-20',
};

const marginStyles: Record<BoxMargin, string> = {
  none: 'm-0',
  xs: 'm-1',
  sm: 'm-2',
  md: 'm-4',
  lg: 'm-6',
  xl: 'm-8',
  '2xl': 'm-12',
  '3xl': 'm-16',
  '4xl': 'm-20',
};

const marginXStyles: Record<BoxMargin, string> = {
  none: 'mx-0',
  xs: 'mx-1',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6',
  xl: 'mx-8',
  '2xl': 'mx-12',
  '3xl': 'mx-16',
  '4xl': 'mx-20',
};

const marginYStyles: Record<BoxMargin, string> = {
  none: 'my-0',
  xs: 'my-1',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
  xl: 'my-8',
  '2xl': 'my-12',
  '3xl': 'my-16',
  '4xl': 'my-20',
};

export const Box: React.FC<BoxProps> = ({
  as: Component = 'div',
  padding,
  paddingX,
  paddingY,
  margin,
  marginX,
  marginY,
  bg,
  rounded = false,
  shadow = false,
  className = '',
  children,
}) => {
  const paddingClass = padding ? paddingStyles[padding] : '';
  const paddingXClass = paddingX ? paddingXStyles[paddingX] : '';
  const paddingYClass = paddingY ? paddingYStyles[paddingY] : '';
  const marginClass = margin ? marginStyles[margin] : '';
  const marginXClass = marginX ? marginXStyles[marginX] : '';
  const marginYClass = marginY ? marginYStyles[marginY] : '';
  const roundedClass = rounded ? 'rounded-xl' : '';
  const shadowClass = shadow ? 'shadow-lg' : '';

  return (
    <Component
      className={`${paddingClass} ${paddingXClass} ${paddingYClass} ${marginClass} ${marginXClass} ${marginYClass} ${bg || ''} ${roundedClass} ${shadowClass} ${className}`}
    >
      {children}
    </Component>
  );
};
