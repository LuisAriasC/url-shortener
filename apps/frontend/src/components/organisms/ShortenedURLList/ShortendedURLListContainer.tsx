import React from 'react';
import { ShortenedURLList } from './ShortenedURLList';
import { Url } from '@url-shortener/types';

interface Props {
  urls: Pick<Url, "id" | "shortId" | "originalUrl">[];
}

export const ShortenedURLListContainer: React.FC<Props> = ({ urls }) => {
  return <ShortenedURLList urls={urls} />;
};