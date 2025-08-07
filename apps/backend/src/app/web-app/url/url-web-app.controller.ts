import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Res,
    HttpStatus,
    Query,
    Patch,
  } from '@nestjs/common';
  import { UrlWebAppService } from './url-web-app.service';
  import { Response } from 'express';
  import { Throttle } from '@nestjs/throttler';
import { GetUrlResponse, ListAllResponse, ShortenResponse, Url } from '@url-shortener/types';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

  @Throttle({ default: { limit: 60, ttl: 60 } })
  @Controller()
  export class UrlWebAppController {
    constructor(private readonly urlWebAppService: UrlWebAppService) {}
  
    @Throttle({ shorten: { limit: 20, ttl: 30 } })
    @Post('urls/shorten')
    shorten(
      @CurrentUser() user: JwtPayload,
      @Body() body: { url: string},
      @Res() res: Response<ShortenResponse | { error: string }>,
    ) {
      this.urlWebAppService.createShortUrl(user.userId,body.url).subscribe({
        next: (result) => res.status(201).json(result),
        error: (err) =>
          res.status(HttpStatus.BAD_REQUEST).json({ error: err.message }),
      });
    }

    @Get('urls/list-all')
    listAll(@CurrentUser() user: JwtPayload, @Res() res: Response<ListAllResponse | { error: string }>) {
      this.urlWebAppService.findAllUserUrls(user.userId).subscribe({
        next: (result) => res.json({ urls: result }),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Get(':slug')
    @Public() 
    getUrl(
      @Param('slug') slug: string,
      @Res() res: Response<GetUrlResponse | { error: string }>
    ) {
      this.urlWebAppService.getUrl(slug).subscribe({
        next: (result) => res.json(result),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Get('urls/top-visited')
    getTopVisited(
      @CurrentUser() user: JwtPayload,
      @Query('limit') limit = 5,
      @Res() res: Response<Url[] | { error: string }>
    ) {
      const topLimit = Math.max(1, Math.min(Number(limit), 100));
      return this.urlWebAppService.findTopVisited(user.userId, topLimit).subscribe({
        next: (urls) => res.json(urls),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Patch('urls/update-slug')
    updateSlug(
      @CurrentUser() user: JwtPayload,
      @Body() body: { id: string; newSlug: string },
      @Res() res: Response<Url | { error: string }>
    ) {
      return this.urlWebAppService.updateSlug(user.userId, body.id, body.newSlug).subscribe({
        next: (url) => res.status(200).json(url),
        error: (err) => res.status(400).json({ error: err.message }),
      });
    }
  }