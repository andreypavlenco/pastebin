import { Inject, Injectable } from '@nestjs/common';
import { SettingRepository } from '../../shared/repositories/setting.repository';
import { LinkRepository } from '../../shared/repositories/link.repository';
import { PostRepository } from '../../shared/repositories/post.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SettingEntity } from 'src/models/setting.entity';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { DataSource, EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

export interface AutoDeleteSetting {
  setting_id: number;
  deleteLink: Date;
  deletePost: Date;
  link: LinkEntity;
  post: PostEntity;
}

@Injectable()
export class AutoDeleteService {
  constructor(
    @Inject(SettingRepository) private settingRepository: SettingRepository,
    @Inject(DataSource) private readonly dataSourse: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async autoDelete() {
    try {
      const autoFindSetting: AutoDeleteSetting[] =
        await this.settingRepository.autoFindDelete();

      if (autoFindSetting && autoFindSetting.length > 0) {
        console.log(`Found ${autoFindSetting.length} items to delete.`);
        await this.autoDeleteTransaction(autoFindSetting);
        console.log('Deletion completed successfully.');
        return 'AutoDelete';
      } else {
        console.log('No items found to delete.');
      }
    } catch (error) {
      console.error('Error occurred during autoDelete:', error);
    }
  }

  async autoDeleteTransaction(settings: AutoDeleteSetting[]) {
    const idsToDelete = {
      settings: settings.map((setting) => setting.setting_id),
      posts: settings.map((setting) => setting.post.post_id),
      links: settings.map((setting) => setting.link.link_id),
    };

    const queryRunner = this.dataSourse.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SettingEntity)
        .where('setting_id IN (:...ids)', { ids: idsToDelete.settings })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where('post_id IN (:...ids)', { ids: idsToDelete.posts })
        .execute();

      await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(LinkEntity)
        .where('link_id IN (:...ids)', { ids: idsToDelete.links })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release;
    }
  }
}
