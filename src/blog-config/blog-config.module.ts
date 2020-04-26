import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import jwtConfig from './config/jwt.config';
import databaseConfig from './config/database.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, databaseConfig],
    }),
  ],
})
export class BlogConfigModule {}
