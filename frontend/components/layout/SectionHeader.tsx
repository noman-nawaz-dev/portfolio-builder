import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 sm:mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg sm:text-xl text-gray-600 ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
