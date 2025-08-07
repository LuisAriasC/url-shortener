
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user-entity';
import { Observable, catchError, from, throwError } from 'rxjs';
import { inspect } from 'util';
import { CreateUserBase, User } from '@url-shortener/types';

@Injectable()
export class UserEntityService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  handleError(location: string, error: unknown): Observable<never> {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5 , true)}`,))
  }

  create(user: CreateUserBase): Observable<User> {
    const newEntry = this.userRepo.create(user);
    return from(this.userRepo.save(newEntry)).pipe(
        catchError(error => this.handleError('create', error))
    );
  }

  findByEmail(email: string): Observable<User | null> {
    return from(this.userRepo.findOne({ where: { email } })).pipe(
      catchError(error => this.handleError('findByEmail', error))
    );
  }

  findById(id: string): Observable<User | null> {
    return from(this.userRepo.findOne({ where: { id } })).pipe(
      catchError(error => this.handleError('findById', error))
    );
  }
}