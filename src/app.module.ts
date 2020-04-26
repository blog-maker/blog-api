import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogConfigModule } from './blog-config/blog-config.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [BlogConfigModule, AuthModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
