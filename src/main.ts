import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { enableSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  enableSwagger(app);

  await app.listen(3000);
}
bootstrap();
