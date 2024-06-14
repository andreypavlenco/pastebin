import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('port');
  await app.listen(port);
}
bootstrap();
