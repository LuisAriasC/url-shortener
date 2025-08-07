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
import { GetUrlResponse, ListPaginatedUrlResponse, ShortenResponse, Url } from '@url-shortener/types';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtPayload } from '../../common/interfaces/jwt-payload.interface';

  @Throttle({ default: { limit: 60, ttl: 60 } })
  @Controller('urls')
  export class UrlWebAppController {
    constructor(private readonly urlWebAppService: UrlWebAppService) {}
  
    @Throttle({ shorten: { limit: 20, ttl: 30 } })
    @Post('shorten')
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

    @Get('list')
    list(
      @CurrentUser() user: JwtPayload,
      @Query('page') page = '1',
      @Query('pageSize') pageSize = '5',
      @Res() res: Response<ListPaginatedUrlResponse | { error: string }>
    ) {
      const pageNum = Math.max(1, Number(page));
      const sizeNum = Math.max(1, Math.min(Number(pageSize), 100));
    
      this.urlWebAppService.list(user.userId, pageNum, sizeNum).subscribe({
        next: (result) => res.json(result),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Get('top-visited')
    getTopVisited(
      @CurrentUser() user: JwtPayload,
      @Query('limit') limit = 5,
      @Res() res: Response<Url[] | { error: string }>
    ) {
      const topLimit = Math.max(1, Math.min(Number(limit), 100));
      return this.urlWebAppService.getTopVisited(user.userId, topLimit).subscribe({
        next: (urls) => res.json(urls),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Patch('update-slug')
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
  }