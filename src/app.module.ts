import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BlogConfigModule } from './blog-config/blog-config.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { RedirectSwaggerMiddleware } from './redirect-swagger.middleware';

@Module({
  imports: [BlogConfigModule, AuthModule, CoreModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectSwaggerMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.GET });
  }
}
