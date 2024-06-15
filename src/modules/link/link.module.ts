import { ConfigModule } from '@nestjs/config';
import { LinkController } from './link.controller';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { LinkService } from './link.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  controllers: [LinkController],
  providers: [LinkService, LinkRepository],
  exports: [LinkService],
})
export class LinkModule {}
