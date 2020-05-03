import { ModelDefinition } from '@nestjs/mongoose';

import { UserSchema } from '../../../../core/domain/schemas/user.schema';

export const UserMongooseModel: ModelDefinition = {
  name: 'User',
  schema: UserSchema,
  collection: 'users',
};
