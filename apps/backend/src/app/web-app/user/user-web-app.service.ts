// apps/backend/src/app/web-app/user/user-web-app.service.ts
import { Injectable } from '@nestjs/common';
import { UserEntityService } from '../../entities/user/user-entity.service';
import { CreateUserBase, User} from '@url-shortener/types';
import { Observable, throwError, catchError, switchMap, from } from 'rxjs';
import { inspect } from 'util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserWebAppService {
  private readonly saltRounds = 10;
  constructor(private readonly userEntityService: UserEntityService) {}

  handleError(location: string, error: unknown): Observable<never> {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5 , true)}`,))
  }

  findByEmail(email: string): Observable<User | null> {
    return this.userEntityService.findByEmail(email).pipe(
      catchError((err) => this.handleError('findByEmail', err))
    );
  }

  registerUser(user: CreateUserBase): Observable<User> {
    return this.userEntityService.findByEmail(user.email).pipe(
      switchMap((registeredUser) => {
        console.debug('registerUser - User found:', registeredUser);
        if (registeredUser) {
          return throwError(() => new Error('User already exists'));
        }
        console.debug('registerUser - Hashing password for:', user.email)
        return from(bcrypt.hash(user.password, this.saltRounds))
      }),
      switchMap((hashedPassword) => {
        console.debug('registerUser - Hashed password:', hashedPassword);
        const newUser: CreateUserBase = {
          ...user,
          password: hashedPassword,
        };
        console.debug('registerUser - Creating new user:', newUser)
        return this.userEntityService.create(newUser);
      }),
      catchError((err) => {
        return this.handleError('registerUser', err);
      })
    );
  }

  comparePasswords(
    plainPassword: string,
    hashedPassword: string
  ): Observable<boolean> {
    console.debug('comparePasswords - Comparing passwords');
    return from(bcrypt.compare(plainPassword, hashedPassword)).pipe(
      catchError((err) => {
        return this.handleError('comparePasswords', err);
      })
    );
  }
}