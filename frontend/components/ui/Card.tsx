import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-3 md:p-4',
  md: 'p-4 md:p-6',
  lg: 'p-6 md:p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100 ${
        hoverable ? 'hover:shadow-2xl hover:-translate-y-1 transition-all duration-300' : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  gradient?: boolean;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  gradient = false,
  className = '',
}) => {
  return (
    <div
      className={`px-4 py-3 md:px-6 md:py-4 ${
        gradient ? 'bg-gradient-to-r from-teal-700 to-emerald-600' : 'bg-neutral-50 border-b border-neutral-200'
      } ${className}`}
    >
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = '',
}) => {
  return <div className={`p-4 md:p-6 ${className}`}>{children}</div>;
};
