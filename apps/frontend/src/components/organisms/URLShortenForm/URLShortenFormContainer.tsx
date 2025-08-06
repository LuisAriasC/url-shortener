// containers/URLShortenFormContainer.tsx
import React, { useMemo, useState } from 'react';
import { URLShortenForm } from './URLShortenForm';
import { isValidUrl, isValidSlug } from '../../../utils/validation';
import { copyToClipboard } from '../../../utils/api';
import { useShortenUrl } from '../../../services/hooks/url';
import { Url } from '@url-shortener/types';
import { UrlService } from '../../../services/modules';

interface Props {
  onUrlShortened: (result: Url) => void;
}

export const URLShortenFormContainer: React.FC<Props> = ({ onUrlShortened }) => {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [urlError, setUrlError] = useState('');
  const [slugError, setSlugError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [copied, setCopied] = useState(false);

  const appUrl = process.env.REACT_APP_APP_URL;
  const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000/api';;
  const urlService: UrlService = useMemo(() => new UrlService(apiUrl), [apiUrl]);
  const { result, error, loading, shorten } = useShortenUrl(urlService);

  const validateForm = (): boolean => {
    let isValid = true;
    setUrlError('');
    setSlugError('');
    setGeneralError('');

    if (!url.trim()) {
      setUrlError('URL is required');
      isValid = false;
    } else if (!isValidUrl(url)) {
      setUrlError('Please enter a valid URL');
      isValid = false;
    }

    if (slug && !isValidSlug(slug)) {
      setSlugError('Invalid slug format');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    shorten({ url });
    //onUrlShortened && result && onUrlShortened(result);
    setUrl('');
    setSlug('');
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await copyToClipboard(`${appUrl}/${result.shortId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <URLShortenForm
      url={url}
      slug={slug}
      urlError={urlError}
      slugError={slugError}
      generalError={generalError || error || ''}
      loading={loading}
      result={result}
      copied={copied}
      onChangeUrl={setUrl}
      onSubmit={handleSubmit}
      onCopy={handleCopy}
    />
  );
};