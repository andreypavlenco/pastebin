import { Injectable } from '@nestjs/common';
import { URL } from 'url';
@Injectable()
export class GenerateLinkUrl {
  getUrl(port: number, path: string): string {
    const urlObj = new URL(`http://localhost:${port}/link`);
    urlObj.searchParams.set('key', path);
    const newLink = urlObj.toString();
    return newLink;
  }
}
