// apps/backend/src/app/web-app/auth/auth-web-app.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWebAppService } from '../user/user-web-app.service';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { CreateUserBase, User } from '@url-shortener/types';
import { inspect } from 'util';

@Injectable()
export class AuthWebAppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userWebAppService: UserWebAppService
  ) {}

  private handleError(location: string, error: unknown) {
    return throwError(() => new Error(`${location}: ${inspect(error, false, 5, true)}`));
  }

  loginOrRegister(userData: CreateUserBase): Observable<{ accessToken: string }> {
    return this.userWebAppService.findByEmail(userData.email)
      .pipe(
        switchMap((user) => {
        console.log('User found:', user);
          if (!user) {
            // No existe: registramos
            return this.userWebAppService.registerUser(userData);
          } else {
            console.debug('User already exists:', user);
            // Existe: validamos contraseña
            return this.userWebAppService.comparePasswords(userData.password, user.password).pipe(
              switchMap((match) => {
                if (!match) {
                  return this.handleError('loginOrRegister', new Error('Invalid password'));
                }
                return of(user);
              })
            );
          }
        }),
        switchMap((user) => this.generateToken(user)),
      );
  }

  private generateToken(user: User) {
    console.debug('Generating token for user:', user);
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return of({ accessToken: token, user });
  }
}