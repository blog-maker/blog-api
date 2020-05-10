import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RedirectSwaggerMiddleware implements NestMiddleware {
  use(req: any, res: any) {
    res.redirect('/swagger-ui');
  }
}
