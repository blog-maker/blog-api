import { Module } from '@nestjs/common';

import { MailerConfigController } from './mailer-config.controller';
import { MailerConfigService } from './mailer-config.service';
import { MailerConfigRepository } from './mailer-config.repository';
import { MongooseModelModule } from '../core/database/mongoose-model/mongoose-model.module';
import { MailerConfigMongooseModel } from '../core/database/mongoose-model/models/mailer-config';

@Module({
  imports: [MongooseModelModule.forFeature([MailerConfigMongooseModel])],
  controllers: [MailerConfigController],
  providers: [MailerConfigService, MailerConfigRepository],
})
export class MailerConfigModule {}
