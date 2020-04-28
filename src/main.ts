import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { enableSwagger } from './swagger';
import { securityConfig } from './security.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  securityConfig(app);
  enableSwagger(app);

  await app.listen(3000);
}
bootstrap();
