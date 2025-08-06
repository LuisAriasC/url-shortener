import React from 'react';
import { ExternalLink } from 'lucide-react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ 
  href, 
  children, 
  external = false, 
  className = '' 
}) => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`
        inline-flex items-center gap-1 text-primary-600 hover:text-primary-700
        transition-colors duration-200 ease-in-out underline decoration-1
        underline-offset-2 hover:decoration-2
        ${className}
      `}
    >
      {children}
      {external && <ExternalLink className="w-3 h-3" />}
    </a>
  );
};