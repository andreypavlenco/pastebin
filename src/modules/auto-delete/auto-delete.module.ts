import { Module } from '@nestjs/common';
import { AutoDeleteService } from './auto-delete.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AutoDeleteTransaction } from '../../shared/transaction/auto-delete.transaction';
import { AwsModule } from '../aws-s3';
import { SettingRepository } from 'src/shared/repositories';

@Module({
  imports: [ScheduleModule.forRoot(), AwsModule],
  providers: [AutoDeleteService, SettingRepository, AutoDeleteTransaction],
})
export class AutoDeleteModule {}
