import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { savePostDto } from './dto';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/post')
  savePost(@Body() dto: savePostDto) {
    return this.postService.savePost(dto);
  }
}
