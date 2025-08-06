import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { UrlService } from '../../../services/modules';
import { useTopVisitedUrls } from '../../../services/hooks/url';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { Select } from '../../atoms/Select/Select';

const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';
const urlService = new UrlService(apiUrl);

export const TopVisitedDashboard: React.FC = () => {
  const [top, setTop] = useState<number>(5);
  const { urls, loading, error } = useTopVisitedUrls(top, urlService);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTop(Number(event.target.value));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-secondary-900">Top Visited URLs</h2>
        <Select value={top} onChange={handleChange}>
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              Top {n}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-red-600 text-center">❌ Error loading top visited URLs</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={urls}>
            <XAxis dataKey="shortId" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitCount" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};