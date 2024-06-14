import { Inject, Injectable } from '@nestjs/common';

import { savePostDto } from './dto';
import * as fs from 'fs/promises';
import { UniqueKeyService } from '../uniqueKey/uniquekey.service';
import { UploadService } from '../upload/upload.service';
import { LinkService } from '../link/link.service';
import { PostRepository } from './post.repository';
import { SettingService } from '../setting/setting.service';

@Injectable()
export class PostService {
  constructor(
    private readonly uniqueKeyService: UniqueKeyService,
    private readonly uploadService: UploadService,
    private readonly linkService: LinkService,
    private readonly settingService: SettingService,
    @Inject(PostRepository) private readonly postRepository: PostRepository,
  ) {}

  async savePost(dto: savePostDto) {
    try {
      const txtData = JSON.stringify(dto.text, null, 2);
      const dataBuffer = Buffer.from(txtData, 'utf-8');
      const originalKey: string = this.uniqueKeyService.uniqueKeyGenerate();
      const txtFilePath = `${originalKey}.txt`;

      const [, , link] = await Promise.all([
        fs.writeFile(txtFilePath, dataBuffer, 'utf8'),
        this.uploadService.uploadFile(dataBuffer, txtFilePath, 'text/plain'),
        this.linkService.generateUrl(txtFilePath),
      ]);

      const post = await this.postRepository.createPost(originalKey, link);
      await this.settingService.saveSetting(post, link);
      await fs.unlink(txtFilePath);
      return link;
    } catch (error) {
      console.error(`Ошибка при записи данных в файл:`, error);
      throw error;
    }
  }
}
