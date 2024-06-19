import { RedisModule } from './redis/redis.module';
import { RedisService } from './redis/redis.service';
import { LoggerService } from './logging/logger.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from 'src/config';
import { PostModule } from './modules/post/post.module';
import { PgModule } from 'src/pgdb/pg.module';
import { AutoDeleteModule } from './modules/auto-delete/auto-delete.module';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    PgModule,
    AutoDeleteModule,
    PostModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
