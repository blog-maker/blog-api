import { NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

function enableRateLimit(app: NestExpressApplication) {
  const windowMs = parseInt(process.env.RATE_WINDOW_MS || '0');
  const max = parseInt(process.env.RATE_MAX || '0');

  if (windowMs > 0 && max > 0) {
    app.use(
      rateLimit({
        windowMs,
        max,
      })
    );
  }
}

export function securityConfig(app: NestExpressApplication) {
  app.set('trust proxy', 1);

  app.use(helmet());
  app.enableCors();
  enableRateLimit(app);
}
