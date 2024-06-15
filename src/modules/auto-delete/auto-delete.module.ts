import { Module } from '@nestjs/common';
import { AutoDeleteService } from './auto-delete.service';
import { SettingRepository } from '../../shared/repositories/setting.repository';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [AutoDeleteService, SettingRepository],
})
export class AutoDeleteModule {}
