// apps/frontend/src/components/organisms/ShortenedURLList/ShortenedURLList.tsx
import React from 'react';
import { URLListItem } from '../../molecules/URLListItem/URLListItem';
import { Url } from '@url-shortener/types';

interface ShortenedURLListProps {
  urls: Pick<Url, "id" | "shortId" | "originalUrl">[];
  total: number;
}

export const ShortenedURLList: React.FC<ShortenedURLListProps> = ({ urls, total }) => {
  if (urls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-secondary-400 text-lg mb-2">No shortened URLs yet</div>
        <div className="text-secondary-500 text-sm">
          Shorten your first URL to see it appear here
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-secondary-900">
        Your Shortened URLs ({ total })
      </h2>
      <div className="space-y-3">
        {urls.map((url) => (
          <URLListItem key={url.id} shortenedUrl={url} />
        ))}
      </div>
    </div>
  );
};