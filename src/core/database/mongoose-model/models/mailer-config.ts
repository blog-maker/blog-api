import { ModelDefinition } from '@nestjs/mongoose';

import { MailerConfigSchema } from '../../../../core/domain/schemas/mailer-config.schema';

export const MailerConfigMongooseModel: ModelDefinition = {
  name: 'MailerConfig',
  schema: MailerConfigSchema,
  collection: 'mailer_config',
};
