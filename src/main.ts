import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { enableSwagger } from './swagger';
import { securityConfig } from './security.config';
import { insertSuperUser } from './insert-superuser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  securityConfig(app);
  enableSwagger(app);

  await insertSuperUser(app);

  await app.listen(3000);
}
bootstrap();
