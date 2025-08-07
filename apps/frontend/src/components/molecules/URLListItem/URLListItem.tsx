// apps/frontend/src/components/molecules/URLListItem/URLListItem.tsx
import React, { useState } from 'react';
import { Copy, Check, Pencil, Save } from 'lucide-react';
import { Link } from '../../atoms/Link/Link';
import { Button } from '../../atoms/Button/Button';
import { copyToClipboard } from '../../../utils/api';
import { Url } from '@url-shortener/types';
import { singletonUrlService } from '../../../services/modules';

interface URLListItemProps {
  shortenedUrl: Pick<Url, 'id' | 'shortId' | 'originalUrl'>;
}

export const URLListItem: React.FC<URLListItemProps> = ({ shortenedUrl }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSlug, setNewSlug] = useState(shortenedUrl.shortId);
  const [currentSlug, setCurrentSlug] = useState(shortenedUrl.shortId);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const appUrl = process.env.REACT_APP_APP_URL;

  const handleCopy = async () => {
    try {
      await copyToClipboard(`${appUrl}/${currentSlug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleSubmit = async () => {
    if (newSlug === currentSlug) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    setError(null);

    singletonUrlService.updateSlug(shortenedUrl.id, newSlug).subscribe({
      next: () => {
        setCurrentSlug(newSlug);
        setIsEditing(false);
        setLoading(false);
      },
      error: (err) => {
        console.error('Failed to update slug:', err);
        setError(err?.response.data.error || 'Failed to update slug');
        setLoading(false);
      },
    });
  };

  const truncateUrl = (url: string, maxLength = 50) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url;
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-xl border border-secondary-200 hover:border-secondary-300 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0 space-y-1">
          <div className="text-sm text-secondary-600">
            Original: {truncateUrl(shortenedUrl.originalUrl)}
          </div>

          <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                className="border px-2 py-1 rounded w-64 text-sm"
                value={newSlug}
                disabled={loading}
                onChange={(e) => setNewSlug(e.target.value)}
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setNewSlug(currentSlug);
                  setIsEditing(false);
                  setError(null);
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Link href={`${appUrl}/${currentSlug}`} external>
                {`${appUrl}/${currentSlug}`}
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEditClick}
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </>
          )}
          </div>

          {error && (
            <div className="text-red-500 text-xs mt-1">{error}</div>
          )}
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
    </div>
  );
};