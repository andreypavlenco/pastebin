import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { RedisClient } from './redis.client';
import { CacheService } from './cache.service';


@Module({
  controllers: [],
  providers: [RedisService, RedisClient, ConfigService, CacheService],
  exports: [RedisService],
})
export class RedisModule {}
