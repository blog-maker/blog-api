import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';

import { ProblemDetailsExceptionsFilter } from './problem-details/problem-details-exception-filter';
import { BCryptService } from './services/bcrypt.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ProblemDetailsExceptionsFilter,
    },
    BCryptService,
  ],
})
export class CoreModule {}
