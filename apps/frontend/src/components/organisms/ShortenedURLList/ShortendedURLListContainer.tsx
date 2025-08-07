import React, { useEffect, useState } from 'react';
import { ShortenedURLList } from './ShortenedURLList';
import { ListPaginatedUrlResponse } from '@url-shortener/types';
import { singletonUrlService } from '../../../services/modules';

export const ShortenedURLListContainer: React.FC = () => {
  const [data, setData] = useState<ListPaginatedUrlResponse | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const sub = singletonUrlService.list({ page, pageSize }).subscribe({
      next: (res) => setData(res),
      error: (err) => console.error('Failed to fetch URLs:', err),
    });

    return () => sub.unsubscribe();
  }, [page]);

  if (!data) return <div>Loading...</div>;

  const handleNext = () => {
    if (page * pageSize < data.total) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div>
      <ShortenedURLList urls={data.urls} total={data.total}/>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {Math.ceil(data.total / pageSize)}
        </span>
        <button
          onClick={handleNext}
          disabled={page * pageSize >= data.total}
          className="text-sm text-blue-600 hover:underline disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};