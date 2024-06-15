import { Injectable, Logger } from '@nestjs/common';
import { LinkEntity } from 'src/models/link.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class LinkRepository {
  private linkRepository;
  private logger = new Logger();
  constructor(private dataSource: DataSource) {
    this.linkRepository = this.dataSource.getRepository(LinkEntity);
  }

  async createLink(link: string): Promise<LinkEntity> {
    try {
      const newLink = new LinkEntity();
      newLink.link = link;
      return await this.linkRepository.save(newLink);
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async getLink(): Promise<LinkEntity[]> {
    try {
      return await this.linkRepository.find();
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
