import { Inject, Injectable } from '@nestjs/common';
import { SettingEntity } from 'src/models/setting.entity';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { DataSource } from 'typeorm';
import { DeleteSettingPost } from 'src/modules/auto-delete';

@Injectable()
export class AutoDeleteTransaction {
  constructor(@Inject(DataSource) private readonly dataSourse: DataSource) {}

  async getDelete(settings: DeleteSettingPost[]) {
    const idsToDelete = {
      settings: settings.map((setting) => setting.setting_id),
      posts: settings.map((setting) => setting.post.post_id),
      links: settings.map((setting) => setting.link.link_id),
    };

    const queryRunner = this.dataSourse.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deleteSettingsResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SettingEntity)
        .where('setting_id IN (:...ids)', { ids: idsToDelete.settings })
        .execute();
      console.log(`Удалено настроек: ${deleteSettingsResult.affected}`);

      const deletePostsResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where('post_id IN (:...ids)', { ids: idsToDelete.posts })
        .execute();
      console.log(`Удалено постов: ${deletePostsResult.affected}`);

      const deleteLinksResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(LinkEntity)
        .where('link_id IN (:...ids)', { ids: idsToDelete.links })
        .execute();
      console.log(`Удалено ссылок: ${deleteLinksResult.affected}`);

      await queryRunner.commitTransaction();
      return {
        deletedSettings: deleteSettingsResult.affected,
        deletedPosts: deletePostsResult.affected,
        deletedLinks: deleteLinksResult.affected,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release;
    }
  }
}
