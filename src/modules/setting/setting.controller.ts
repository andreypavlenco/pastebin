import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { timePostDTO } from './dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @ApiOperation({ summary: 'Update time setting for a post' })
  @ApiBody({ type: timePostDTO })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the post to update the time setting for.',
  })
  @ApiResponse({
    status: 200,
    description: 'Time setting updated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  async settingTimePost(@Param('id') id: string, @Body() dto: timePostDTO) {
    try {
      const result = await this.settingService.updataTimeDeletePost(
        Number(id),
        dto.time,
      );
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Post not found.');
      } else {
        throw new BadRequestException('Invalid input data.');
      }
    }
  }
}
