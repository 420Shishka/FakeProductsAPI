import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('APP_PORT');

  if (!appPort) {
    throw new Error('.env variable APP_PORT is not defined');
  }

  app.setGlobalPrefix('/api/v1');
  app.enableCors();

  await app.listen(appPort);
}
bootstrap();
