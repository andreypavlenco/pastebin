import { ConfigModule } from '@nestjs/config';
import { LinkController } from './link.controller';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkService } from './link.service';
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws-s3';
import { GenerateLinkUrl } from 'src/helpers';
import { RedisModule } from 'src/redis/redis.module';
import { PostModule } from '../post';

@Module({
  imports: [ConfigModule, AwsModule, RedisModule, PostModule],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository, GenerateLinkUrl],
  exports: [LinkService],
})
export class LinkModule {}
