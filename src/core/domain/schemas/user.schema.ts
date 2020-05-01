import validators from 'mongoose-validators';

import { defaultSchema } from './base.schema';
import {
  requiredStringType,
  optionalNumberType,
  optionalBooleanType,
  OptionalDate,
  RequiredString,
  OptionalString,
} from './types';
import { allowedCharacters } from './validators';

export const UserSchema = defaultSchema({
  username: requiredStringType({
    unique: true,
    trim: true,
    validate: allowedCharacters(
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@'
    ),
  }),
  normalizedUserName: RequiredString,
  password: RequiredString,
  email: requiredStringType({ validate: [validators.isEmail()] }),
  normalizedEmail: RequiredString,
  firstName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  lastName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  phoneNumber: OptionalString,
  lockoutEnabled: optionalBooleanType({ default: false }),
  accessFailedCount: optionalNumberType({ default: 0 }),
  lockoutEnd: OptionalDate,
});
