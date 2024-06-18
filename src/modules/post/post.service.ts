import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { savePostDto } from './dto';
import { LinkService } from '../link/link.service';
import { PostRepository } from '../../shared/repositories/post.repository';
import { SettingService } from '../setting/setting.service';
import { AwsService } from '../aws-s3';
import { BufferFileKey } from 'src/helpers/buffer-file';
import { UserRepository } from 'src/shared/repositories';

@Injectable()
export class PostService {
  constructor(
    private readonly awsService: AwsService,
    private readonly linkService: LinkService,
    private readonly settingService: SettingService,
    @Inject(PostRepository) private readonly postRepository: PostRepository,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(BufferFileKey) private readonly bufferFileKey: BufferFileKey,
  ) {}

  async savePost(dto: savePostDto, userId: number) {
    try {
      const { keyFile, bufferFile } = this.bufferFileKey.get(dto.text);
      await this.awsService.saveFileS3(bufferFile, keyFile);
      const link = await this.linkService.generateUrl(keyFile);
      const user = await this.userRepository.findUserById(userId);
      const post = await this.postRepository.createPost(keyFile, link, user);
      await this.settingService.saveSetting(post, link, user);
      return link;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePost(dto: savePostDto, keyFile: string) {
    try {
      const { bufferFile } = this.bufferFileKey.get(dto.text);
      return await this.awsService.updateFileS3(keyFile, bufferFile);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
