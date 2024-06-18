import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { AwsService } from '../aws-s3';
import { Response, Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('link')
export class LinkController {
  constructor(
    private linksrvice: LinkService,
    private readonly awsService: AwsService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Get('list')
  getLink(@Req() req: Request) {
    console.log(req.user);
    return this.linksrvice.getLink();
  }

  @Get()
  async findLinkFile(@Res() res: Response, @Query('key') key: string) {
    try {
      const fileBuffer = await this.awsService.findFileS3(key);
      if (!fileBuffer) {
        return res.status(HttpStatus.NOT_FOUND).send('File not found');
      }
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(fileBuffer);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
}
