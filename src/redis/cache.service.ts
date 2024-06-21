import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.client';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private client: Redis;
  private maxSize: number;
  private currentSize: number;
  constructor(@Inject(RedisClient) private redisClient: RedisClient) {
    this.client = this.redisClient.getClient();
    this.maxSize = 50;
    this.currentSize = 0;
  }

  async updateSize() {
    this.currentSize = Number(await (this.client.dbsize(), 10));
  }

  async evict() {
    const keys = await this.client.keys('*');
    const ttlKeys = await Promise.all(
      keys.map(async (key) => {
        const ttl = await this.client.ttl(key);
        return { key, ttl };
      }),
    );

    ttlKeys.sort((a, b) => a.ttl - b.ttl);
    const keyToEvict = ttlKeys[0].key;
    await this.client.del(keyToEvict);
    this.currentSize--;
  }

  async has(key: string) {
    const exists = await this.client.exists(key);
    return exists === 1;
  }
  async del(key: string): Promise<void> {
    await this.client.del(key);
    this.currentSize--;
  }

  async reset(): Promise<void> {
    await this.client.flushdb();
    this.currentSize = 0;
  }

  currentMax() {
    if (this.currentSize >= this.maxSize) {
      this.currentSize++;
      return true;
    }
    return false;
  }
}
