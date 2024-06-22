import { SettingController } from './setting.controller';
import { SettingRepository } from '../../shared/repositories/setting.repository';

import { SettingService } from './setting.service';

import { Module } from '@nestjs/common';
import { DeleteSettingTransaction } from 'src/shared/transaction';

@Module({
  controllers: [SettingController],
  providers: [SettingService, SettingRepository, DeleteSettingTransaction],
  exports: [SettingService],
})
export class SettingModule {}
