import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisClient {
  private client: Redis;
  private logger = new Logger(RedisClient.name);
  constructor(private configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('redis.host'),
      port: this.configService.get<number>('redis.post'),
    });

    this.client.on('error', (error) => {
      this.logger.fatal('Redis Client Error', error);
    });
  }
  getClient(): Redis {
    return this.client;
  }
}
