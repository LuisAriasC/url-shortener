import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: `
      bg-primary-600 text-white hover:bg-primary-700 
      focus:ring-primary-500 disabled:bg-primary-300
      shadow-soft hover:shadow-medium
    `,
    secondary: `
      bg-secondary-100 text-secondary-700 hover:bg-secondary-200
      focus:ring-secondary-500 disabled:bg-secondary-50 disabled:text-secondary-400
    `,
    outline: `
      bg-transparent text-secondary-700 border-2 border-secondary-300
      hover:bg-secondary-50 hover:border-secondary-400
      focus:ring-secondary-500 disabled:text-secondary-400 disabled:border-secondary-200
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
};