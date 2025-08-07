import { useState, useEffect, useRef, useCallback } from 'react';
import { GetUrlResponse, ListAllResponse, ShortenInput, ShortenResponse, Url } from '@url-shortener/types';
import { Subscription } from 'rxjs';
import { UrlService } from '../modules';

export function useShortenUrl(service: UrlService) {
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const subRef = useRef<Subscription | null>(null);

  const shorten = (data: ShortenInput) => {
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

export function useUrlList(urlService: UrlService) {
  const [urls, setUrls] = useState<ListAllResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    const subscription: Subscription = urlService.listAll().subscribe({
      next: (data) => {
        setUrls(data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [urlService]);

  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, [fetchData]);

  return { urls, loading, error, refetch: fetchData, setUrls };
}

export function useGetUrl(shortId?: string, urlService?: UrlService) {
  const [url, setUrl] = useState<GetUrlResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shortId || !urlService) return;

    const sub: Subscription = urlService.getUrl(shortId).subscribe({
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

export function useTopVisitedUrls(top: number, urlService: UrlService) {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const subscription: Subscription = urlService.getTopVisitedUrls(top).subscribe({
      next: (data) => {
        setUrls(data);
        setLoading(false);
      },
      error: (err) => {
        setError(err);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [top, urlService]); // 👈 ahora sí se vuelve a ejecutar cuando cambia `top`

  return { urls, loading, error };
}