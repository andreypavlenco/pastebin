import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  Query,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return this.uploadService.uploadFile(file);
  // }

  @Get('/link')
  async uploadDownload(@Res() res: Response, @Query('key') key: string) {
    try {
      const fileBuffer = await this.uploadService.dowlandFile(key);
      if (!fileBuffer) {
        return res.status(HttpStatus.NOT_FOUND).send('File not found');
      }

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(fileBuffer);
    } catch (error) {
      console.error(`Ошибка при обработке файла ${key}:`, error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }

  @Delete('/deleteS3')
  deleteS3() {
    return this.uploadService.deleteFile(
      '29bace51-8a57-470e-865e-2e234c065b83.txt',
    );
  }
}
