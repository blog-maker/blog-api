import { OmitType } from '@nestjs/swagger';

import { MailerConfigDto } from './mailer-config.dto';

export class PersistMailerConfigDto extends OmitType(MailerConfigDto, [
  '_id',
  'createdAt',
  'updatedAt',
]) {}
