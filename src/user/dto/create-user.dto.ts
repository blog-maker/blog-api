import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  'accessFailedCount',
  'lockoutEnd',
  'normalizedEmail',
  'normalizedUserName',
  'isActive',
  'createdAt',
  'updatedAt',
]) {}
