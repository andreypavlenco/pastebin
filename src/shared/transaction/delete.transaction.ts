import { Inject, Injectable } from '@nestjs/common';
import { SettingEntity } from 'src/models/setting.entity';
import { LinkEntity } from 'src/models/link.entity';
import { PostEntity } from 'src/models/post.entity';
import { DataSource } from 'typeorm';
import { DeleteSettingPost } from '../../modules/auto-delete/auto-delete.service';

@Injectable()
export class DeleteSettingTransaction {
  constructor(@Inject(DataSource) private readonly dataSourse: DataSource) {}

  async getDelete(setting: DeleteSettingPost) {
    const { post, link, setting_id } = setting;

    const queryRunner = this.dataSourse.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const deleteSettingsResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(SettingEntity)
        .where('setting_id IN id', { id: setting_id })
        .execute();
      console.log(`Удалено настроек: ${deleteSettingsResult.affected}`);

      const deletePostsResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where('post_id IN id', { id: post.post_id })
        .execute();
      console.log(`Удалено постов: ${deletePostsResult.affected}`);

      const deleteLinksResult = await queryRunner.manager
        .createQueryBuilder()
        .delete()
        .from(LinkEntity)
        .where('link_id IN id', { id: link.link_id })
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
