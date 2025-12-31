import React from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  icon?: string;
  onClose?: () => void;
  className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string }> = {
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
  },
  info: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-800',
  },
};

const defaultIcons: Record<AlertVariant, string> = {
  success: '✓',
  error: '⚠️',
  warning: '⚠️',
  info: 'ℹ️',
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  onClose,
  className = '',
}) => {
  const styles = variantStyles[variant];
  const displayIcon = icon || defaultIcons[variant];

  return (
    <div
      className={`p-4 rounded-xl border flex items-start gap-3 ${styles.bg} ${styles.border} ${styles.text} ${className}`}
    >
      {displayIcon && <span className="text-lg flex-shrink-0">{displayIcon}</span>}
      <div className="flex-1 font-medium">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${styles.text} hover:opacity-70 transition`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
