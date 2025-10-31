import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
        hoverable ? 'hover:shadow-2xl transition-shadow duration-300' : ''
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
      className={`px-6 py-4 ${
        gradient ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-50 border-b border-gray-200'
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
  return <div className={`p-6 ${className}`}>{children}</div>;
};
