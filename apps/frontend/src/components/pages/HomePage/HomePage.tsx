import React, { useState, useEffect } from 'react';
import { MainTemplate } from '../../templates/MainTemplate/MainTemplate';
import { Link2 } from 'lucide-react';
import { ListAllResponse } from '@url-shortener/types';
import { ShortenedURLListContainer } from '../../organisms/ShortenedURLList/ShortendedURLListContainer';
import { URLShortenFormContainer } from '../../organisms/URLShortenForm/URLShortenFormContainer';
import { TopVisitedDashboard } from '../../organisms/TopVisitedDashboard/TopVisitedDashboard';
import { singletonUrlService } from '../../../services/modules';
import { useAuth } from '../../../contexts/AuthContext'; // 👈 importamos el contexto

export const HomePage: React.FC = () => {
  const [urls, setUrls] = useState<ListAllResponse | null>(null);
  const { logout } = useAuth(); // 👈 usamos logout del contexto

  // Al montar, carga la lista inicial
  useEffect(() => {
    const subscription = singletonUrlService.listAll().subscribe({
      next: (res) => setUrls(res),
      error: (err) => console.error('Failed to load URLs', err),
    });

    return () => subscription.unsubscribe();
  }, []);

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
          {/* 👇 Botón de logout */}
          <button
            onClick={logout}
            className="mt-2 text-sm text-red-600 underline hover:text-red-800"
          >
            Log Out
          </button>
          <p className="text-lg text-secondary-600 max-w-md mx-auto">
            Transform long URLs into short, shareable links instantly
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <URLShortenFormContainer />
        </div>

        {/* Updated list */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <ShortenedURLListContainer urls={urls?.urls || []} />
        </div>

        {/* Dashboard */}
        <div className="bg-white rounded-2xl shadow-soft border border-secondary-100 p-6 sm:p-8">
          <TopVisitedDashboard />
        </div>
      </div>
    </MainTemplate>
  );
};