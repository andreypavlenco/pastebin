import { Injectable, Logger } from '@nestjs/common';
import { SettingEntity } from 'src/models/setting.entity';
import { DataSource } from 'typeorm';
import { AutoDeleteSetting } from '../../modules/auto-delete/auto-delete.service';

@Injectable()
export class SettingRepository {
  private settingRepository;
  private logger = new Logger();
  constructor(private dataSource: DataSource) {
    this.settingRepository = this.dataSource.getRepository(SettingEntity);
  }

  async createSetting(post, link): Promise<SettingEntity> {
    try {
      const newSetting = new SettingEntity();
      newSetting.link = link;
      newSetting.post = post;
      return await this.settingRepository.save(newSetting);
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async getSetting(): Promise<SettingEntity[]> {
    try {
      return await this.settingRepository.find();
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }

  async autoFindDelete(): Promise<AutoDeleteSetting[]> {
    try {
      const settings: AutoDeleteSetting[] = await this.settingRepository
        .createQueryBuilder('setting')
        .innerJoinAndSelect('setting.link', 'link')
        .innerJoinAndSelect('setting.post', 'post')
        .where('setting.deleteLink < :currentDate', {
          currentDate: new Date(),
        })
        .getMany();
      const idsToDelete = settings.map((setting) => setting.setting_id);
      console.log(' idsToDelete', idsToDelete);
      return settings;
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
