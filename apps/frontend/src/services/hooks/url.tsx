// apps/frontend/src/hooks/useUrlApi.ts

import { useState, useEffect, useRef } from 'react';
import { Url } from '@url-shortener/types';
import { Subscription } from 'rxjs';
import { ShortenRequest, UrlService } from '../modules';

export function useShortenUrl(service: UrlService) {
  const [result, setResult] = useState<Url | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const subRef = useRef<Subscription | null>(null);

  const shorten = (data: ShortenRequest) => {
    setLoading(true);
    setError(null);

    const sub = service.shorten(data).subscribe({
      next: (res) => {
        setResult(res);
        setLoading(false);
      },
      error: (err) => {
        setError(err?.response?.data?.error || err.message || 'Unknown error');
        setLoading(false);
      },
    });

    subRef.current = sub;
  };

  const cancel = () => {
    subRef.current?.unsubscribe();
  };

  // Cancelar en desmontaje
  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return { result, error, loading, shorten, cancel };
}

export function useUrlList(service: UrlService) {
  const [urls, setUrls] = useState<Url[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const sub = service.list().subscribe({
      next: (data) => {
        setUrls(data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  return { urls, loading, error };
}

export function useGetUrl(shortId?: string, urlService?: UrlService) {
  const [url, setUrl] = useState<Url | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shortId || !urlService) return;

    const sub: Subscription = urlService.get(shortId).subscribe({
      next: (data) => {
        setUrl(data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    return () => sub.unsubscribe();
  }, [shortId, urlService]);

  return { url, loading, error };
}