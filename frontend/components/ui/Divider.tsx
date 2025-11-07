import React from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'medium' | 'thick';

interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  thickness?: DividerThickness;
  label?: string;
  className?: string;
}

const variantStyles: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

const thicknessStyles: Record<DividerOrientation, Record<DividerThickness, string>> = {
  horizontal: {
    thin: 'border-t',
    medium: 'border-t-2',
    thick: 'border-t-4',
  },
  vertical: {
    thin: 'border-l',
    medium: 'border-l-2',
    thick: 'border-l-4',
  },
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  label,
  className = '',
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div
            className={`w-full border-gray-200 ${variantStyles[variant]} ${thicknessStyles[orientation][thickness]}`}
          />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">{label}</span>
        </div>
      </div>
    );
  }

  const orientationClass = orientation === 'vertical' ? 'h-full' : 'w-full';

  return (
    <div
      className={`border-gray-200 ${orientationClass} ${variantStyles[variant]} ${thicknessStyles[orientation][thickness]} ${className}`}
    />
  );
};
