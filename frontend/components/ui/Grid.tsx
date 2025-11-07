import React from 'react';

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12;
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface GridProps {
  cols?: GridCols;
  smCols?: GridCols;
  mdCols?: GridCols;
  lgCols?: GridCols;
  gap?: GridGap;
  className?: string;
  children: React.ReactNode;
}

const colsStyles: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const responsiveColsStyles = {
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
    12: 'sm:grid-cols-12',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    12: 'md:grid-cols-12',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
    12: 'lg:grid-cols-12',
  },
};

const gapStyles: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

export const Grid: React.FC<GridProps> = ({
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 'md',
  className = '',
  children,
}) => {
  const smColsClass = smCols ? responsiveColsStyles.sm[smCols] : '';
  const mdColsClass = mdCols ? responsiveColsStyles.md[mdCols] : '';
  const lgColsClass = lgCols ? responsiveColsStyles.lg[lgCols] : '';

  return (
    <div
      className={`grid ${colsStyles[cols]} ${smColsClass} ${mdColsClass} ${lgColsClass} ${gapStyles[gap]} ${className}`}
    >
      {children}
    </div>
  );
};
