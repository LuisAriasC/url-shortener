// libs/api/modules/url.ts
import { GetUrlResponse, ListAllResponse, ShortenInput, ShortenResponse, Url, UrlApi } from '@url-shortener/types';
import { fromAxios, axiosInstance } from '../api';
import { catchError, Observable } from 'rxjs';

export class UrlService implements UrlApi {
  private readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  shorten(payload: ShortenInput): Observable<ShortenResponse> {
    return fromAxios(axiosInstance.post<ShortenResponse>(`${this.apiUrl}/shorten`, payload).then(res => res.data)).pipe(
        catchError(err => {
            console.error('Error shortening URL:', err);
            throw new Error(err.response?.data?.error || 'Failed to shorten URL');
        })
    );
  }

  listAll(): Observable<ListAllResponse> {
    return fromAxios(axiosInstance.get<ListAllResponse>(`${this.apiUrl}/list-all`).then(res => res.data));
  }

  getUrl(slug: string): Observable<GetUrlResponse> {
    return fromAxios(axiosInstance.get<GetUrlResponse>(`${this.apiUrl}/${slug}`).then(res => res.data));
  }

  getTopVisitedUrls(top: number): Observable<Url[]> {
    return fromAxios(axiosInstance.get<Url[]>(`${this.apiUrl}/urls/top-visited?limit=${top}`).then(res => res.data));
  }
};