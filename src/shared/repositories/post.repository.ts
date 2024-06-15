import { Injectable, Logger } from '@nestjs/common';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PostRepository {
  private postRepository;
  private logger = new Logger();
  constructor(private dataSource: DataSource) {
    this.postRepository = this.dataSource.getRepository(PostEntity);
  }

  async createPost(
    originalname: string,
    link: LinkEntity,
  ): Promise<PostEntity> {
    try {
      const newPost = new PostEntity();
      newPost.key_text = originalname;
      newPost.link = link;
      return await this.postRepository.save(newPost);
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
