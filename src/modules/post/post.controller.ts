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
import { Request, Response } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Save a new post' })
  @ApiBody({ type: savePostDto })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  savePost(@Body() dto: savePostDto, @Req() req: Request) {
    return this.postService.savePost(dto, req.user['id']);
  }

  @ApiOperation({ summary: 'Update an existing post' })
  @ApiBody({ type: savePostDto })
  @ApiQuery({
    name: 'key',
    type: String,
    description: 'The key of the post to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'Post updated successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  @UseGuards(AccessTokenGuard)
  @Put('update')
  async updatePost(
    @Res() res: Response,
    @Query('key') key: string,
    @Body() dto: savePostDto,
  ) {
    try {
      const updatedPost = await this.postService.updatePost(dto, key);
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(404).send({ message: 'Post not found.' });
    }
  }
}
