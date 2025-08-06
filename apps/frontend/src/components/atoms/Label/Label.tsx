import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ 
  htmlFor, 
  children, 
  required = false, 
  className = '' 
}) => {
  return (
    <label 
      htmlFor={htmlFor} 
      className={`block text-sm font-medium text-secondary-700 mb-2 ${className}`}
    >
      {children}
      {required && <span className="text-error-500 ml-1">*</span>}
    </label>
  );
};