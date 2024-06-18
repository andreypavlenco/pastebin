import { Inject, Injectable } from '@nestjs/common';
import { SettingRepository } from '../../shared/repositories/setting.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { AutoDeleteTransaction } from '../../shared/transaction/auto-delete.transaction';
import { AwsService } from '../aws-s3';

export interface DeleteSettingPost {
  setting_id: number;
  deletePost: Date;
  link: LinkEntity;
  post: PostEntity;
}

@Injectable()
export class AutoDeleteService {
  constructor(
    @Inject(SettingRepository) private settingRepository: SettingRepository,
    @Inject(AutoDeleteTransaction)
    private autoDeleteTransaction: AutoDeleteTransaction,
    private awsService: AwsService,
  ) {}

  @Cron(CronExpression.EVERY_8_HOURS)
  async autoDelete() {
    try {
      const autoFindSettings: DeleteSettingPost[] =
        await this.settingRepository.autoFindDelete();

      if (autoFindSettings && autoFindSettings.length > 0) {
        console.log(`Found ${autoFindSettings.length} items to delete.`);
        const deleteTransaction =
          await this.autoDeleteTransaction.getDelete(autoFindSettings);
        if (
          deleteTransaction.deletedSettings === 0 &&
          deleteTransaction.deletedPosts === 0 &&
          deleteTransaction.deletedLinks === 0
        ) {
          const keysToDeleteAWS = {
            posts: autoFindSettings.map((setting) => setting.post.key_file),
          };
          await this.awsService.autoDeleteFilesS3(keysToDeleteAWS.posts);
        }
        console.log('Deletion completed successfully.');
        return 'AutoDelete';
      } else {
        console.log('No items found to delete.');
      }
    } catch (error) {
      console.error('Error occurred during autoDelete:', error);
    }
  }
}
