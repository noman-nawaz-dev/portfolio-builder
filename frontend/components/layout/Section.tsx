import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'gray' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundStyles = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  gradient: 'bg-gradient-to-br from-indigo-50 via-white to-purple-50',
};

const paddingStyles = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16 sm:py-20',
  xl: 'py-20 sm:py-24',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'white',
  padding = 'lg',
}) => {
  return (
    <section
      id={id}
      className={`${backgroundStyles[background]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </section>
  );
};
