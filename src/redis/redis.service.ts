import { Injectable, Logger } from '@nestjs/common';
import { RedisClient } from './redis.client';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);

  constructor(private redisClient: RedisClient) {}

  async setRedis(keyFile, bufferFile) {
    try {
      const setResult = await this.redisClient
        .getClient()
        .set(keyFile, bufferFile);
      this.logger.log(`${setResult}`);
      return setResult;
    } catch (error) {
      this.logger.error(`Error setting Redis key ${keyFile}: ${error.message}`);
      throw error;
    }
  }

  async getRedis(keyFile) {
    try {
      const getResult = await this.redisClient.getClient().get(keyFile);
      this.logger.log(`${getResult}`);
      return getResult;
    } catch (error) {
      this.logger.error(`Error getting Redis key ${keyFile}: ${error.message}`);
      throw error;
    }
  }
}
