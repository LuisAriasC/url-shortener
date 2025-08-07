import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { useGetUrl } from '../../../services/hooks/url';
import { singletonUrlService } from '../../../services/modules';

export function RedirectHandler() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const redirected = useRef(false);
  const [delayPassed, setDelayPassed] = useState(false);

  const { url, loading, error } = useGetUrl(slug, singletonUrlService);

  // Timer to enforce minimum loading duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayPassed(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (redirected.current || !slug || loading || !delayPassed) return;

    if (url?.originalUrl) {
      redirected.current = true;
      window.location.href = url.originalUrl;
    } else if (error) {
      redirected.current = true;
      navigate('/not-found');
    }
  }, [slug, url, error, loading, navigate, delayPassed]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size="lg" />
    </div>
  );
}