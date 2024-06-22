import { CacheService } from './redis/cache.service';
import { RedisModule } from './redis/redis.module';
import { LoggerService } from './logger/logger.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { PgModule } from 'src/pgdb/pg.module';
import { AutoDeleteModule } from './modules/auto-delete/auto-delete.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    PgModule,
    AutoDeleteModule,
    PostModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
