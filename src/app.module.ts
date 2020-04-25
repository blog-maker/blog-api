import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BlogConfigModule } from './blog-config/blog-config.module';

@Module({
  imports: [BlogConfigModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
