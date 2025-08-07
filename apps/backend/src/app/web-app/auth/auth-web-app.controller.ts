import { Body, Controller, Post } from '@nestjs/common';
import { AuthWebAppService } from './auth-web-app.service';
import { CreateUserBase } from '@url-shortener/types';
import { Observable } from 'rxjs';
import { Public } from '../../common/decorators/public.decorator';

@Controller('auth')
export class AuthWebAppController {
  constructor(private readonly authWebAppService: AuthWebAppService) {}

  @Post('login-or-register')
  @Public() 
  loginOrRegister(@Body() user: CreateUserBase): Observable<{ accessToken: string }> {
    return this.authWebAppService.loginOrRegister(user);
  }
}