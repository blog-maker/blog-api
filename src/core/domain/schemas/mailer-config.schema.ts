import * as validators from 'mongoose-validators';

import { defaultSchema } from './base.schema';
import {
  RequiredString,
  RequiredNumber,
  requiredBooleanType,
  requiredStringType,
  OptionalString,
} from './types';

export const MailerConfigSchema = defaultSchema({
  host: RequiredString,
  port: RequiredNumber,
  secure: requiredBooleanType({ default: false }),
  auth: {
    user: RequiredString,
    pass: RequiredString,
  },
  sender: {
    name: OptionalString,
    email: requiredStringType({ validate: [validators.isEmail()] }),
  },
});
