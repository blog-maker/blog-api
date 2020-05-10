import * as validators from 'mongoose-validators';

import { defaultSchema } from './base.schema';
import {
  requiredStringType,
  optionalBooleanType,
  RequiredString,
  OptionalString,
} from './types';
import { allowedCharacters, AllowedUsernameCharacters } from './validators';

export const UserSchema = defaultSchema({
  username: requiredStringType({
    unique: true,
    trim: true,
    validate: {
      validator: allowedCharacters(AllowedUsernameCharacters),
      message: () => `Only letters, numbers,-,. and _ are permitted.`,
    },
  }),
  normalizedUserName: RequiredString,
  password: RequiredString,
  email: requiredStringType({ validate: [validators.isEmail()] }),
  normalizedEmail: RequiredString,
  firstName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  lastName: requiredStringType({ validate: [validators.isAlphanumeric()] }),
  phoneNumber: OptionalString,
  admin: optionalBooleanType({ default: false }),
});
