import {
  Body,
  Controller,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { savePostDto } from './dto';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  savePost(@Body() dto: savePostDto, @Req() req: Request) {
    return this.postService.savePost(dto, req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Put('update')
  updatePost(
    @Res() res: Response,
    @Query('key') key: string,
    @Body() dto: savePostDto,
  ) {
    return this.postService.updatePost(dto, key);
  }
}
