import { Injectable } from '@nestjs/common';
import { SettingEntity } from 'src/models/setting.entity';
import { DataSource, Repository } from 'typeorm';
import { DeleteSettingPost } from '../../modules/auto-delete/auto-delete.service';
import { LinkEntity, PostEntity } from 'src/models';
import { UserEntity } from 'src/models/user.entity';
@Injectable()
export class SettingRepository {
  private settingRepository: Repository<SettingEntity>;
  constructor(private dataSource: DataSource) {
    this.settingRepository = this.dataSource.getRepository(SettingEntity);
  }
  async createSetting(
    post: PostEntity,
    link: LinkEntity,
    user: UserEntity,
  ): Promise<SettingEntity> {
    try {
      const newSetting = new SettingEntity();
      newSetting.link = link;
      newSetting.post = post;
      newSetting.user = user;
      return await this.settingRepository.save(newSetting);
    } catch (error) {
      throw new Error('Failed to create setting');
    }
  }
  async getSetting(): Promise<SettingEntity[]> {
    try {
      return await this.settingRepository.find();
    } catch (error) {
      throw new Error('Failed to get settings');
    }
  }
  async autoFindDelete(): Promise<DeleteSettingPost[]> {
    try {
      const settings = await this.settingRepository
        .createQueryBuilder('setting')
        .innerJoinAndSelect('setting.link', 'link')
        .innerJoinAndSelect('setting.post', 'post')
        .where('setting.deleteLink < :currentDate', {
          currentDate: new Date(),
        })
        .getMany();
      const deleteSettings: DeleteSettingPost[] = settings.map((setting) => ({
        setting_id: setting.setting_id,
        link: setting.link,
        post: setting.post,
        deletePost: setting.deleteTimePost,
      }));
      return deleteSettings;
    } catch (error) {
      throw new Error('Failed to auto find delete');
    }
  }
  async updateTimeDeletePost(settingId: number, timePost: Date): Promise<void> {
    try {
      await this.settingRepository
        .createQueryBuilder()
        .update(SettingEntity)
        .set({ deleteTimePost: timePost })
        .where('setting_id = :setting_id', { setting_id: settingId })
        .execute();
    } catch (error) {
      throw new Error('Failed to update time delete post');
    }
  }
  async deleteSettingPost(settingId: number): Promise<DeleteSettingPost> {
    try {
      const settings = await this.settingRepository
        .createQueryBuilder('setting')
        .innerJoinAndSelect('setting.link', 'link')
        .innerJoinAndSelect('setting.post', 'post')
        .where('setting.setting_id = :id', { id: settingId })
        .getMany();
      if (settings.length > 0) {
        const setting = settings[0];
        return {
          setting_id: setting.setting_id,
          link: setting.link,
          post: setting.post,
          deletePost: setting.deleteTimePost,
        };
      } else {
        throw new Error(`Setting with id ${settingId} not found`);
      }
    } catch (error) {
      throw new Error('Failed to delete setting post');
    }
  }
}
