import { Injectable } from '@nestjs/common';
import { UrlEntityService } from '../../entities/url/url-entity.service';
import { Url, generateShortId} from '@url-shortener/types';
import { Observable, throwError, of, switchMap, catchError, map } from 'rxjs';
import { isValidUrl } from '@url-shortener/types';
import { inspect } from 'util';

@Injectable()
export class UrlWebAppService {
  constructor(private readonly urlEntityService: UrlEntityService) {}

  handleError(location: string, error: unknown): Observable<never> {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5 , true)}`,))
  }

  createShortUrl(userId: string, originalUrl: string): Observable<Url> {
    if (!isValidUrl(originalUrl)) {
      return this.handleError('createShortUrl', 'Invalid URL provided');
    }

    const shortId = generateShortId(8);

    return this.urlEntityService.findByShortId(shortId).pipe(
      switchMap(existing => {
        if (existing) {
          return throwError(() => new Error('Slug already exists'));
        }
        return this.urlEntityService.create(userId, originalUrl, shortId);
      }),
      catchError(error => this.handleError('createShortUrl', error))
    );
  }

  findAll(): Observable<Url[]> {
    return this.urlEntityService.findAll().pipe(
      catchError(error => this.handleError('findAll', error))
    );
  }

  getUrl(shortId: string): Observable<Url | null> {
    return this.urlEntityService.findByShortId(shortId).pipe(
      switchMap(url => {
        if (!url) {
          return of(null);
        }
        url.visitCount += 1; // Increment visit count
        return this.urlEntityService.update(url).pipe(
          switchMap(() => of(url)),
          catchError(error => this.handleError('getUrl', error))
        );
      }),
      catchError(error => this.handleError('getUrl', error))
    );
  }

  findAllUserUrls(userId: string): Observable<Url[]> {
    return this.urlEntityService.findAllUserUrls(userId).pipe(
      catchError(error => this.handleError('findAll', error))
    );
  }

  findTopVisited(userId: string, limit: number): Observable<Url[]> {
    return this.urlEntityService.findTopVisited(userId, limit).pipe(
      catchError(error => this.handleError('findTopVisited', error))
    );
  }

  updateSlug(userId: string, urlId: string, newSlug: string): Observable<Url | null> {
    if(newSlug.length !== 8) {
      return this.handleError('updateSlug', 'Slug must be exactly 8 characters long');
    }
    return this.urlEntityService.updateSlug(userId, urlId, newSlug).pipe(
      map(url => {
        if (!url) {
          throw new Error('URL not found or slug already in use');
        }
        return url;
      }),
      catchError(error => throwError(() => error))
    );
  }
}