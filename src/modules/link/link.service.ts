import { Inject, Injectable } from '@nestjs/common';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkEntity } from 'src/models/link.entity';
import { ConfigService } from '@nestjs/config';
import { GenerateLinkUrl } from 'src/helpers';

@Injectable()
export class LinkService {
  constructor(
    @Inject(LinkRepository) private linkRepository: LinkRepository,
    @Inject(GenerateLinkUrl) private generateLinkUrl: GenerateLinkUrl,
    private configService: ConfigService,
  ) {}

  async generateUrl(path: string): Promise<LinkEntity> {
    const port = this.configService.get('port');
    const newLink = this.generateLinkUrl.getUrl(port, path);
    return this.linkRepository.createLink(newLink);
  }

  getLink(): Promise<LinkEntity[]> {
    return this.linkRepository.getLink();
  }
}
