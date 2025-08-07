
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UrlEntity } from './url-entity';
import { Url} from '@url-shortener/types';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { inspect } from 'util';

@Injectable()
export class UrlEntityService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepo: Repository<UrlEntity>,
  ) {}

  handleError(location: string, error: unknown): Observable<never> {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5 , true)}`,))
  }

  create(userId: string, originalUrl: string, shortId: string): Observable<Url> {
    const newEntry = this.urlRepo.create({ originalUrl, shortId, visitCount: 0, createdBy: { id: userId } });
    return from(this.urlRepo.save(newEntry)).pipe(
        catchError(error => this.handleError('create', error))
    );
  }

  findByShortId(shortId: string): Observable<Url | null> {
    return from(this.urlRepo.findOne({ where: { shortId } })).pipe(
        catchError(error => this.handleError('findByShortId', error))
    );
  }

  findAll(): Observable<Url[]> {
    return from(this.urlRepo.find()).pipe(
        catchError(error => this.handleError('findAll', error))
    );
  }

  update(url: Url): Observable<Url> {
    return from(this.urlRepo.save(url)).pipe(
        catchError(error => this.handleError('update', error))
    );
  }

  findAllUserUrls(userId: string): Observable<Url[]> {
    return from(this.urlRepo.find({
      where: { 
        createdBy: { id: userId },
      },
      order: { createdAt: 'DESC' },
    })).pipe(
        catchError(error => this.handleError('findAll', error))
    );
  }

  findTopVisited(userId: string, take: number): Observable<Url[]> {
    console.debug('Finding top visited URLs for user:', userId, 'with limit:', take);
    return from(
      this.urlRepo.find({
        where: { 
          createdBy: { id: userId },
          visitCount: MoreThan(0)
        },
        order: { visitCount: 'DESC' },
        take,
      }),
    ).pipe(
      catchError(error => this.handleError('findTopVisited', error))
    );
  }

  updateSlug(userId: string, urlId: string, newSlug: string): Observable<Url | null> {
    return from(this.urlRepo.findOneBy({ shortId: newSlug })).pipe(
      switchMap(existing => {
        if (existing) {
          throw new Error('Slug already in use');
        }
        return from(this.urlRepo.findOne({ where: { id: urlId, createdBy: { id: userId } } })).pipe(
          switchMap(url => {
            if (!url) {
              throw new Error('URL not found or not owned by user');
            }
            url.shortId = newSlug;
            return from(this.urlRepo.save(url)).pipe(
              map(() => url),
              catchError(error => this.handleError('updateSlug', error))
            );
          })
        );
      }),
    );
  }
}