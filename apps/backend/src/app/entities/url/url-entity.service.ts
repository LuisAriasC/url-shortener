
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url-entity';
import { Url} from '@url-shortener/types';
import { Observable, catchError, from, throwError } from 'rxjs';
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

  create(originalUrl: string, shortId: string): Observable<Url> {
    const newEntry = this.urlRepo.create({ originalUrl, shortId });
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
}