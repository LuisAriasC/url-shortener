import { Url } from '@url-shortener/types';
import { ShortenURLRequest } from '../types';

export const shortenUrl = async (data: ShortenURLRequest): Promise<Url> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.url || data.url === 'error') {
        reject(new Error('Invalid URL provided'));
        return;
      }

      const slug = Math.random().toString(36).substring(2, 8);
      resolve({
        id: crypto.randomUUID(),
        originalUrl: data.url,
        shortId: `https://short.ly/${slug}`,
        createdAt: new Date(),
      });
    }, 1500);
  });
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};