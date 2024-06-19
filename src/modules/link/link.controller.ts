import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { AwsService } from '../aws-s3';
import { Response, Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('link')
export class LinkController {
  constructor(
    private linkService: LinkService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('list')
  getLink(@Req() req: Request) {
    console.log(req.user);
    return this.linkService.getLink();
  }

  @Get()
  async findLinkFile(@Res() res: Response, @Query('key') key: string) {
    const fileBuffer = await this.linkService.findLinkFile(key);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(fileBuffer);
  }
}
