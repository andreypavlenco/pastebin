import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { RedisClient } from './redis.client';


@Module({
  controllers: [],
  providers: [RedisService, RedisClient, ConfigService],
  exports: [RedisService],
})
export class RedisModule {}
