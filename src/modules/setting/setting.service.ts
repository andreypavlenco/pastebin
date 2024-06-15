import { Inject, Injectable } from '@nestjs/common';
import { SettingRepository } from '../../shared/repositories/setting.repository';
import { PostEntity } from 'src/models/post.entity';
import { LinkEntity } from 'src/models/link.entity';

@Injectable()
export class SettingService {
  constructor(
    @Inject(SettingRepository) private settingRepository: SettingRepository,
  ) {}

  saveSetting(post: PostEntity, link: LinkEntity) {
    return this.settingRepository.createSetting(post, link);
  }

  // updateTimeLinkSetting() {
  //   return this.settingRepository.createSetting(post, link);
  // }
}
