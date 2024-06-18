import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from 'src/config';
import { PostModule } from './modules/post/post.module';
import { PgModule } from 'src/pgdb/pg.module';
import { AutoDeleteModule } from './modules/auto-delete/auto-delete.module';

@Module({
  imports: [
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
  providers: [],
})
export class AppModule {}
