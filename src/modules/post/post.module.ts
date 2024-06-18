import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AwsModule } from '../aws-s3/aws.module';
import { LinkModule } from '../link/link.module';
import { PostRepository } from '../../shared/repositories/post.repository';
import { SettingModule } from '../setting/setting.module';
import { BufferFileKey, GenerateUniqueKey } from 'src/helpers';
import { UserRepository } from 'src/shared/repositories';

@Module({
  imports: [LinkModule, AwsModule, SettingModule],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository,
    BufferFileKey,
    GenerateUniqueKey,
    UserRepository,
  ],
})
export class PostModule {}
