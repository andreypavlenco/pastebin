import { Inject, Injectable } from '@nestjs/common';
import { GenerateUniqueKey } from '../unique-key';

@Injectable()
export class BufferFileKey {
  constructor(
    @Inject(GenerateUniqueKey)
    private readonly generateUniqueKey: GenerateUniqueKey,
  ) {}

  get(file): { keyFile: string; bufferFile: Buffer } {
    const txtData = JSON.stringify(file, null, 2);
    const bufferFile: Buffer = Buffer.from(txtData, 'utf-8');
    const keyFile: string = `${this.generateUniqueKey.get()}.txt`;
    return { keyFile, bufferFile };
  }
}
