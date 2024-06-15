import { Controller, Get } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private linksrvice: LinkService) {}

  @Get('all-link')
  getLink() {
    return this.linksrvice.getLink();
  }
}
