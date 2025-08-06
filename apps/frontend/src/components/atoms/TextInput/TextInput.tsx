import React from 'react';

interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'url';
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className = '',
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-3 text-secondary-900 bg-white border-2 rounded-xl
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500/20
        placeholder:text-secondary-400
        disabled:bg-secondary-50 disabled:text-secondary-400 disabled:cursor-not-allowed
        ${error 
          ? 'border-error-500 focus:border-error-500' 
          : 'border-secondary-200 focus:border-primary-500 hover:border-secondary-300'
        }
        ${className}
      `}
    />
  );
};