import { Inject, Injectable, Logger } from '@nestjs/common';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkEntity } from 'src/models/link.entity';
import { ConfigService } from '@nestjs/config';
import { GenerateLinkUrl } from 'src/helpers';
import { RedisService } from 'src/redis/redis.service';
import { AwsService } from '../aws-s3';

@Injectable()
export class LinkService {
  private logger = new Logger(LinkService.name);
  constructor(
    @Inject(LinkRepository) private linkRepository: LinkRepository,
    @Inject(GenerateLinkUrl) private generateLinkUrl: GenerateLinkUrl,
    private redisService: RedisService,
    private configService: ConfigService,
    private readonly awsService: AwsService,
  ) {}

  async generateUrl(path: string): Promise<LinkEntity> {
    const port = this.configService.get('port');
    const newLink = this.generateLinkUrl.getUrl(port, path);
    return this.linkRepository.createLink(newLink);
  }

  getLink(): Promise<LinkEntity[]> {
    return this.linkRepository.getLink();
  }

  async findLinkFile(keyFile: string) {
    const getRedis = await this.redisService.getRedis(keyFile);
    if (getRedis === null) {
      const fileBuffer = await this.awsService.findFileS3(keyFile);
      this.logger.log(`${fileBuffer}`);
      this.redisService.setRedis(keyFile, fileBuffer);
      return fileBuffer;
    }
    return getRedis;
  }
}
