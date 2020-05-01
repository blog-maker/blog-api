import { ModelDefinition } from '@nestjs/mongoose';

import { UserSchema } from 'src/core/domain/schemas/user.schema';

export const UserModel: ModelDefinition = {
  name: 'UserModel',
  schema: UserSchema,
  collection: 'users',
};
