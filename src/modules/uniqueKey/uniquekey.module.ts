import { Module } from '@nestjs/common';
import { UniqueKeyService } from './uniquekey.service';

@Module({
  providers: [UniqueKeyService],
  exports: [UniqueKeyService],
})
export class UniquekeyModule {}
