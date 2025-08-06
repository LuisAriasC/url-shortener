import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Res,
    HttpStatus,
  } from '@nestjs/common';
  import { UrlWebAppService } from './url-web-app.service';
  import { Response } from 'express';
  import { Throttle } from '@nestjs/throttler';
import { Url } from '@url-shortener/types';
  
  @Throttle({ default: { limit: 60, ttl: 60 } })
  @Controller()
  export class UrlWebAppController {
    constructor(private readonly urlWebAppService: UrlWebAppService) {}
  
    @Throttle({ shorten: { limit: 20, ttl: 30 } })
    @Post('shorten')
    shorten(
      @Body() body: { url: string; slug?: string },
      @Res() res: Response,
    ) {
      this.urlWebAppService.createShortUrl(body.url).subscribe({
        next: (result) => res.status(201).json(result),
        error: (err) =>
          res.status(HttpStatus.BAD_REQUEST).json({ error: err.message }),
      });
    }

    @Get('all')
    listAll(@Res() res: Response<Url[] | { error: string }>) {
      this.urlWebAppService.findAll().subscribe({
        next: (result) => res.json(result),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }

    @Get(':slug')
    getUrl(
      @Param('slug') slug: string,
      @Res() res: Response<Url | { error: string }>
    ) {
      this.urlWebAppService.findOne(slug).subscribe({
        next: (result) => res.json(result),
        error: (err) => res.status(500).json({ error: err.message }),
      });
    }
  }