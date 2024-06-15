import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UniquekeyModule } from '../uniqueKey/uniquekey.module';
import { UploadModule } from '../upload/upload.module';
import { LinkModule } from '../link/link.module';
import { PostRepository } from '../../shared/repositories/post.repository';
import { SettingModule } from '../setting/setting.module';

@Module({
  imports: [LinkModule, UniquekeyModule, UploadModule, SettingModule],
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
