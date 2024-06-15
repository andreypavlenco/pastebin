import { SettingRepository } from '../../shared/repositories/setting.repository';
import { SettingService } from './setting.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [SettingService, SettingRepository],
  exports: [SettingService],
})
export class SettingModule {}
