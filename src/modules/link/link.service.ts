import { Inject, Injectable } from '@nestjs/common';
import { URL } from 'url';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkEntity } from 'src/models/link.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkService {
  constructor(
    @Inject(LinkRepository) private linkRepository: LinkRepository,
    private configService: ConfigService,
  ) {}
  async generateUrl(path: string): Promise<LinkEntity> {
    const port = this.configService.get('port');
    const baseUrl = `http://localhost:${port}/link`;
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set('key', path);
    const urlPost = urlObj.toString();
    const link = await this.linkRepository.createLink(urlPost);
    return link;
  }

  getLink(): Promise<LinkEntity[]> {
    return this.linkRepository.getLink();
  }
}
