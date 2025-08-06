import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      className="border border-secondary-300 rounded-lg p-2 text-sm text-secondary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
      {...props}
    >
      {children}
    </select>
  );
};