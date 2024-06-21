import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const loggerService = new LoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerService.createLoggerConfig),
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('app.port') || 3000;
  await app.listen(port);
}

bootstrap();
