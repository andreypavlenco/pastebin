import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SettingRepository } from '../../shared/repositories/setting.repository';
import { PostEntity } from 'src/models/post.entity';
import { LinkEntity } from 'src/models/link.entity';
import { DeleteSettingTransaction } from 'src/shared/transaction/delete.transaction';
import { UserEntity } from 'src/models/user.entity';

@Injectable()
export class SettingService {
  constructor(
    @Inject(SettingRepository) private settingRepository: SettingRepository,
    @Inject(DeleteSettingTransaction) private deleteSettingTransaction,
  ) {}

  saveSetting(post: PostEntity, link: LinkEntity, user: UserEntity) {
    return this.settingRepository.createSetting(post, link, user);
  }

  async deleteSettingPost(settingId) {
    try {
      const setting = await this.deleteSettingPost(settingId);
      if (setting !== undefined) return this.deleteSettingTransaction(setting);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updataTimeDeletePost(settingId: number, timePost: Date) {
    return this.updataTimeDeletePost(settingId, timePost);
  }
}
