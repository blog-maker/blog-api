import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import jwtConfig from './config/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
  ],
})
export class BlogConfigModule {}
