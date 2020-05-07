import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BlogConfigModule } from './blog-config/blog-config.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BlogConfigModule, AuthModule, CoreModule, UserModule],
})
export class AppModule {}
