import { OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class UpdateUserDto extends OmitType(UserDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'isActive',
  'normalizedEmail',
  'normalizedUserName',
  'username',
  'password',
]) {}
