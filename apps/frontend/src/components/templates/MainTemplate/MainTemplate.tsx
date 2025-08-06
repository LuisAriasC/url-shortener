import React from 'react';

interface MainTemplateProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};