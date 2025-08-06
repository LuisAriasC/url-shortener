import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { UrlService } from '../../../services/modules';
import { useGetUrl } from '../../../services/hooks/url';
import { useMemo } from 'react';

export function RedirectHandler() {
  const { shortId } = useParams<{ shortId: string }>();
  const navigate = useNavigate();
  const redirected = useRef(false);
  const [delayPassed, setDelayPassed] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';
  const urlService = useMemo(() => new UrlService(apiUrl), [apiUrl]);

  const { url, loading, error } = useGetUrl(shortId, urlService);

  // Timer to enforce minimum loading duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayPassed(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (redirected.current || !shortId || loading || !delayPassed) return;

    if (url?.originalUrl) {
      redirected.current = true;
      window.location.href = url.originalUrl;
    } else if (error) {
      redirected.current = true;
      navigate('/not-found');
    }
  }, [shortId, url, error, loading, navigate, delayPassed]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  );
}