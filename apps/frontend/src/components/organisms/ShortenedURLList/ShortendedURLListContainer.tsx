// components/organisms/ShortenedURLList/ShortenedURLListContainer.tsx
import React from 'react';
import { useUrlList } from '../../../services/hooks/url';
import { ShortenedURLList } from './ShortenedURLList';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { UrlService } from '../../../services/modules';

interface Props {
  reloadKey: number;
}

export const ShortenedURLListContainer: React.FC<Props> = ({ reloadKey }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const urlService: UrlService = new UrlService(apiUrl || 'http://localhost:3000/api');
  const { urls, loading, error } = useUrlList(urlService, reloadKey); // 👈 se pasa reloadKey

  if (loading) {
    return (
      <div className="text-center py-12">
        <Spinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ErrorMessage message={error.message} />
      </div>
    );
  }

  return <ShortenedURLList urls={urls?.urls || []} />;
};