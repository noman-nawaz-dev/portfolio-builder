import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  gap?: number;
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 6,
  className = '',
}) => {
  const gridCols = `
    ${cols.default ? `grid-cols-${cols.default}` : 'grid-cols-1'}
    ${cols.sm ? `sm:grid-cols-${cols.sm}` : ''}
    ${cols.md ? `md:grid-cols-${cols.md}` : ''}
    ${cols.lg ? `lg:grid-cols-${cols.lg}` : ''}
  `.trim();

  return (
    <div className={`grid ${gridCols} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};
