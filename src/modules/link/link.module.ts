import { ConfigModule } from '@nestjs/config';
import { LinkController } from './link.controller';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkService } from './link.service';
import { Module } from '@nestjs/common';
import { AwsModule } from '../aws-s3';
import { GenerateLinkUrl } from 'src/helpers';

@Module({
  imports: [ConfigModule, AwsModule],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository, GenerateLinkUrl],
  exports: [LinkService],
})
export class LinkModule {}
