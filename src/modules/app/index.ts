import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from 'src/config';
import { PostModule } from '../post/post.module';
import { PgModule } from 'src/pgdb/pg.module';

@Module({
  imports: [
    PgModule,
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
