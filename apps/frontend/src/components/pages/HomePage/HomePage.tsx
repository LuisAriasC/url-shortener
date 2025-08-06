// components/pages/HomePage/HomePage.tsx
import React, { useState } from 'react';
import { MainTemplate } from '../../templates/MainTemplate/MainTemplate';
import { Link2 } from 'lucide-react';
import { Url } from '@url-shortener/types';
import { ShortenedURLListContainer } from '../../organisms/ShortenedURLList/ShortendedURLListContainer';
import { URLShortenFormContainer } from '../../organisms/URLShortenForm/URLShortenFormContainer';
import { TopVisitedDashboard } from '../../organisms/TopVisitedDashboard/TopVisitedDashboard';

export const HomePage: React.FC = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const handleUrlShortened = (result: Url) => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <MainTemplate>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
            <Link2 className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 leading-tight">
            URL Shortener
          </h1>
          <p className="text-lg text-secondary-600 max-w-md mx-auto">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <URLShortenFormContainer onUrlShortened={handleUrlShortened} />
        </div>

        {/* URL List Section */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <ShortenedURLListContainer reloadKey={reloadKey} />
        </div>

        {/* Dashboard Section */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <TopVisitedDashboard />
        </div>
      </div>
    </MainTemplate>
  );
};