import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Link } from '../../atoms/Link/Link';
import { Button } from '../../atoms/Button/Button';
import { copyToClipboard } from '../../../utils/api';
import { Url } from '@url-shortener/types';

interface URLListItemProps {
  shortenedUrl: Url;
}

export const URLListItem: React.FC<URLListItemProps> = ({ shortenedUrl }) => {
  const [copied, setCopied] = useState(false);

  const appUrl = process.env.REACT_APP_APP_URL;
  const handleCopy = async () => {
    try {
      await copyToClipboard(`${appUrl}/${shortenedUrl.shortId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const truncateUrl = (url: string, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-secondary-200 hover:border-secondary-300 transition-colors duration-200">
      <div className="flex-1 min-w-0 space-y-1">
        <div className="text-sm text-secondary-600">
          Original: {truncateUrl(shortenedUrl.originalUrl)}
        </div>
        <div className="flex items-center gap-2">
          <Link href={`${appUrl}/${shortenedUrl.shortId}`} external>
            {`${appUrl}/${shortenedUrl.shortId}`}
          </Link>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="ml-4 flex-shrink-0"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
};