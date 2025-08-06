import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Res,
    HttpStatus,
    Query,
  } from '@nestjs/common';
  import { UrlWebAppService } from './url-web-app.service';
  import { Response } from 'express';
  import { Throttle } from '@nestjs/throttler';
import { GetUrlResponse, ListAllResponse, ShortenResponse, Url } from '@url-shortener/types';

  @Throttle({ default: { limit: 60, ttl: 60 } })
  @Controller()
  export class UrlWebAppController {
    constructor(private readonly urlWebAppService: UrlWebAppService) {}
  
    @Throttle({ shorten: { limit: 20, ttl: 30 } })
    @Post('shorten')
    shorten(
      @Body() body: { url: string},
      @Res() res: Response<ShortenResponse | { error: string }>,
    ) {
      this.urlWebAppService.createShortUrl(body.url).subscribe({
        next: (result) => res.status(201).json(result),
        error: (err) =>
          res.status(HttpStatus.BAD_REQUEST).json({ error: err.message }),
      });
    }

    @Get('list-all')
    listAll(@Res() res: Response<ListAllResponse | { error: string }>) {
      this.urlWebAppService.findAll().subscribe({
        next: (result) => res.json({ urls: result }),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Get(':slug')
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
    getTopVisited(@Query('limit') limit = 5, @Res() res: Response<Url[] | { error: string }>) {
      const topLimit = Math.max(1, Math.min(Number(limit), 100)); // seguridad
      return this.urlWebAppService.findTopVisited(topLimit).subscribe({
        next: (urls) => res.json(urls),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }
  }