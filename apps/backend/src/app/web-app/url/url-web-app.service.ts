import { Injectable } from '@nestjs/common';
import { UrlEntityService } from '../../entities/url/url-entity.service';
import { Url, generateShortId} from '@url-shortener/types';
import { Observable, throwError, of, switchMap, catchError } from 'rxjs';
import { isValidUrl } from '@url-shortener/types';
import { inspect } from 'util';

@Injectable()
export class UrlWebAppService {
  constructor(private readonly urlEntityService: UrlEntityService) {}

  handleError(location: string, error: unknown): Observable<never> {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5 , true)}`,))
  }

  createShortUrl(originalUrl: string): Observable<Url> {
    if (!isValidUrl(originalUrl)) {
      return this.handleError('createShortUrl', 'Invalid URL provided');
    }

    const shortId = generateShortId(24);

    return this.urlEntityService.findByShortId(shortId).pipe(
      switchMap(existing => {
        if (existing) {
          return throwError(() => new Error('Slug already exists'));
        }
        return this.urlEntityService.create(originalUrl, shortId);
      }),
      catchError(error => this.handleError('createShortUrl', error))
    );
  }

  findAll(): Observable<Url[]> {
    return this.urlEntityService.findAll().pipe(
      catchError(error => this.handleError('findAll', error))
    );
  }

  findOne(shortId: string): Observable<Url | null> {
    return this.urlEntityService.findByShortId(shortId).pipe(
      catchError(error => this.handleError('findOne', error))
    );
  }
}