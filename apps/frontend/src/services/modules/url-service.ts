// libs/api/modules/url.ts
import { Url } from '@url-shortener/types';
import { fromAxios, axiosInstance } from '../api';
import { catchError, Observable } from 'rxjs';

export interface ShortenRequest {
  url: string;
}

export class UrlService {
  private readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  shorten(payload: ShortenRequest): Observable<Url> {
    return fromAxios(axiosInstance.post(`${this.apiUrl}/shorten`, payload).then(res => res.data)).pipe(
        catchError(err => {
            console.error('Error shortening URL:', err);
            throw new Error(err.response?.data?.error || 'Failed to shorten URL');
        })
    );
  }

  list(): Observable<Url[]> {
    return fromAxios(axiosInstance.get(`${this.apiUrl}/all`).then(res => res.data));
  }

  get(slug: string): Observable<Url> {
    return fromAxios(axiosInstance.get(`${this.apiUrl}/${slug}`).then(res => res.data));
  }
};