import React from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  helperText,
  error,
  disabled = false,
  required = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const selectClasses = `
    w-full px-4 py-2 md:py-3 
    bg-white border rounded-xl
    text-neutral-900
    focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
    transition-all duration-200
    disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60
    ${error ? 'border-red-500' : 'border-neutral-200 hover:border-neutral-300'}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        className={selectClasses}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
};
