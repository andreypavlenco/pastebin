import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/models/post.entity';
import { UniquekeyModule } from '../uniqueKey/uniquekey.module';
import { UploadModule } from '../upload/upload.module';
import { LinkModule } from '../link/link.module';
import { PostRepository } from './post.repository';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [LinkModule, UniquekeyModule, UploadModule, SettingModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
