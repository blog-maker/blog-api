import * as validators from 'mongoose-validators';

import { customSchema } from './base.schema';
import {
  requiredStringType,
  optionalBooleanType,
  RequiredString,
  OptionalString,
  RequiredNumber,
} from './types';
import { allowedCharacters, AllowedUsernameCharacters } from './validators';

export const UserSchema = customSchema({
  username: requiredStringType({
    unique: true,
    trim: true,
    validate: {
      validator: allowedCharacters(AllowedUsernameCharacters),
      message: () => `Only letters, numbers,-,. and _ are permitted.`,
    },
  }),
  normalizedUserName: RequiredString,
  password: {
    salt: RequiredString,
    hash: RequiredString,
    iterations: RequiredNumber,
  },
  email: requiredStringType({ validate: [validators.isEmail()] }),
  normalizedEmail: RequiredString,
  firstName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  lastName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  phoneNumber: OptionalString,
  admin: optionalBooleanType({ default: false }),
  superuser: optionalBooleanType({ default: false }),
});
