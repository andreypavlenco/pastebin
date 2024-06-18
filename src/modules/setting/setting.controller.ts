import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { SettingService } from './setting.service';
import { timePostDTO } from './dto';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('setting')
export class SettingController {
  constructor(private settigService: SettingService) {}

  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  settingTimePost(@Param('id') id: string, @Body() dto: timePostDTO) {
    return this.settigService.updataTimeDeletePost(Number(id), dto.time);
  }
}
