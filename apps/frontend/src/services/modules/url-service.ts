// libs/api/modules/url.ts
import { GetUrlResponse, ListPaginatedUrlInput, ListPaginatedUrlResponse, ShortenInput, ShortenResponse, Url, UrlApi } from '@url-shortener/types';
import { fromAxios, axiosInstance } from '../api';
import { catchError, Observable } from 'rxjs';

export class UrlService implements UrlApi {
  private readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }
  shorten(payload: ShortenInput): Observable<ShortenResponse> {
    return fromAxios(axiosInstance.post<ShortenResponse>(`${this.apiUrl}/urls/shorten`, payload).then(res => res.data)).pipe(
        catchError(err => {
            console.error('Error shortening URL:', err);
            throw new Error(err.response?.data?.error || 'Failed to shorten URL');
        })
    );
  }

  list(input: ListPaginatedUrlInput): Observable<ListPaginatedUrlResponse> {
    return fromAxios(axiosInstance.get<ListPaginatedUrlResponse>(`${this.apiUrl}/urls/list`, {
      params: input,
    }).then(res => res.data));
  }

  getUrl(slug: string): Observable<GetUrlResponse> {
    return fromAxios(axiosInstance.get<GetUrlResponse>(`${this.apiUrl}/urls/${slug}`).then(res => res.data));
  }

  getTopVisitedUrls(top: number): Observable<Url[]> {
    return fromAxios(axiosInstance.get<Url[]>(`${this.apiUrl}/urls/top-visited?limit=${top}`).then(res => res.data));
  }

  updateSlug(urlId: string, newSlug: string): Observable<Url> {
    return fromAxios(axiosInstance.patch<Url>(`${this.apiUrl}/urls/update-slug`, { id: urlId, newSlug }).then((res) => res.data));
  }
};