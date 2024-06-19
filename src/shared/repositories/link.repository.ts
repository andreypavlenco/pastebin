import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LinkEntity } from 'src/models/link.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LinkRepository {
  private linkRepository;
  private logger = new Logger(LinkRepository.name);
  constructor(private dataSource: DataSource) {
    this.linkRepository = this.dataSource.getRepository(LinkEntity);
  }

  async createLink(link: string): Promise<LinkEntity> {
    try {
      const newLink = new LinkEntity();
      newLink.link = link;
      const createLink = this.linkRepository.save(newLink);

      if (createLink === undefined) {
        throw new BadRequestException('Not create link');
      }
      this.logger.log({
        level: 'info',
        message: `Create link ${newLink.link}`,
      });
      return createLink;
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'Not create link',
        err: error,
      });
      throw new BadRequestException('Not create link');
    }
  }

  async getLink(): Promise<LinkEntity[]> {
    try {
      return await this.linkRepository.find();
    } catch (error) {
      this.logger.log({ level: 'error', message: 'Not find link', err: error });
      throw new BadRequestException('Not find link');
    }
  }
}
