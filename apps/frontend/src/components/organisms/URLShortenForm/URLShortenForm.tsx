// atoms/URLShortenForm/URLShortenForm.tsx
import React from 'react';
import { URLInputField } from '../../molecules/URLInputField/URLInputField';
import { Button } from '../../atoms/Button/Button';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { ShortenResponse } from '@url-shortener/types';
import { Copy, Check } from 'lucide-react';

interface Props {
  url: string;
  slug: string;
  urlError?: string;
  slugError?: string;
  generalError?: string;
  loading: boolean;
  result?: ShortenResponse | null;
  copied: boolean;
  onChangeUrl: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCopy: () => void;
}

export const URLShortenForm: React.FC<Props> = ({
  url, urlError, generalError, loading, result, copied,
  onChangeUrl, onSubmit, onCopy,
}) => {
  const appUrl = process.env.REACT_APP_APP_URL;

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <URLInputField value={url} onChange={onChangeUrl} error={urlError} disabled={loading} />
        {generalError && <ErrorMessage message={generalError} />}
        <Button type="submit" size="lg" loading={loading} disabled={!url.trim()} className="w-full">
          Shorten URL
        </Button>
      </form>

      {result && (
        <div className="p-4 bg-success-50 border border-success-200 rounded-xl">
          <div className="space-y-3">
            <div className="text-success-800 font-medium">✨ Your URL has been shortened!</div>
            <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
              <div className="text-primary-600 font-mono text-sm break-all">
                {`${appUrl}/${result.shortId}`}
              </div>
              <Button variant="outline" size="sm" onClick={onCopy} className="ml-3 flex-shrink-0">
                {copied ? (<><Check className="w-4 h-4 mr-1" />Copied</>) : (<><Copy className="w-4 h-4 mr-1" />Copy</>)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};