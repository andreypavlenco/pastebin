import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { UserEntity } from 'src/models/user.entity';
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
    user: UserEntity,
  ): Promise<PostEntity> {
    try {
      const newPost = new PostEntity();
      newPost.key_file = originalname;
      newPost.link = link;
      newPost.user = user;
      const post = await this.postRepository.save(newPost);
      if (post) {
        return post;
      }
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async findByPost(postId: number): Promise<PostEntity> {
    try {
      const post = await this.postRepository.find({
        where: { post_id: postId },
      });
      if (!post.length) {
        throw new BadRequestException(`Post with id ${postId} not found`);
      }
      return post;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
