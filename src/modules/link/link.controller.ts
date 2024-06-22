import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { AwsService } from '../aws-s3';
import { Response, Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Links')
@Controller('link')
export class LinkController {
  constructor(
    private linkService: LinkService,
    private readonly awsService: AwsService,
  ) {}

  @ApiOperation({ summary: 'Get list of links' })
  @ApiResponse({
    status: 200,
    description: 'List of links retrieved successfully.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AccessTokenGuard)
  @Get('list')
  getLink(@Req() req: Request) {
    console.log(req.user);
    return this.linkService.getLink();
  }

  @ApiOperation({ summary: 'Get link of a file' })
  @ApiResponse({
    status: 200,
    description: 'File found successfully.',
  })
  @ApiResponse({ status: 404, description: 'Could not find the file.' })
  @ApiQuery({
    name: 'key',
    type: String,
    description: 'The key of the file to retrieve the link for.',
  })
  @Get()
  async findLinkFile(@Res() res: Response, @Query('key') key: string) {
    try {
      const fileBuffer = await this.linkService.findLinkFile(key);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(fileBuffer);
    } catch (error) {
      res.status(404).send({ message: 'Could not find the file.' });
    }
  }
}
