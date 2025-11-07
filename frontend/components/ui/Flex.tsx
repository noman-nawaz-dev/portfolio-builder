import React from 'react';

export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface FlexProps {
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: FlexGap;
  smGap?: FlexGap;
  mdGap?: FlexGap;
  lgGap?: FlexGap;
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

const directionStyles: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

const alignStyles: Record<FlexAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyStyles: Record<FlexJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapStyles: Record<FlexGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  gap = 'none',
  smGap,
  mdGap,
  lgGap,
  wrap = false,
  className = '',
  children,
}) => {
  const wrapClass = wrap ? 'flex-wrap' : '';

  // Build responsive gap classes
  const gapClasses = [gapStyles[gap]]; // base gap
  
  if (smGap) {
    gapClasses.push(`sm:${gapStyles[smGap]}`);
  }
  if (mdGap) {
    gapClasses.push(`md:${gapStyles[mdGap]}`);
  }
  if (lgGap) {
    gapClasses.push(`lg:${gapStyles[lgGap]}`);
  }

  const gapClass = gapClasses.join(' ');

  return (
    <div
      className={`flex ${directionStyles[direction]} ${alignStyles[align]} ${justifyStyles[justify]} ${gapClass} ${wrapClass} ${className}`}
    >
      {children}
    </div>
  );
};
