import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { NestFactory } from '@nestjs/core';
import { LoggerService } from './logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClusterService } from './cluster/cluster.service';

async function bootstrap() {
  const loggerService = new LoggerService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerService.createLoggerConfig),
  });
  const config = new DocumentBuilder()
    .setTitle('Pastebin')
    .setDescription('The pastebin Api description')
    .setVersion('1.0')
    .addTag('pastebin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('port') || 3000;
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}

ClusterService.clusterize(bootstrap)
