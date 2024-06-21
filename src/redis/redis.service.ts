import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from './redis.client';
import { Redis } from 'ioredis';
import { CacheService } from './cache.service';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);
  private client: Redis;
  constructor(
    private redisClient: RedisClient,
    private cacheService: CacheService,
  ) {
    this.client = this.redisClient.getClient();
  }
  async get(keyFile) {
    try {
      const data = await this.client.get(keyFile);
      if (data) {
        await this.client.expire(keyFile, 3600);
        this.logger.log(`${data}`);
      }
      return data;
    } catch (error) {
      this.logger.error(`Error getting Redis key ${keyFile}: ${error.message}`);
      throw error;
    }
  }

  async set(keyFile, bufferFile) {
    try {
      await this.cacheService.updateSize();
      const currentMax = this.cacheService.currentMax();
      if (currentMax) {
        await this.cacheService.evict();
      }
      const data = await this.client.set(keyFile, bufferFile);
      this.logger.log(`${data}`);
      return data;
    } catch (error) {
      this.logger.error(`Error setting Redis key ${keyFile}: ${error.message}`);
      throw error;
    }
  }
}
