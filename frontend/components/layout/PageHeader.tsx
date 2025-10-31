import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h1>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
