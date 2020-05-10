import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserDto extends OmitType(UserDto, [
  '_id',
  'normalizedEmail',
  'normalizedUserName',
  'isActive',
  'createdAt',
  'updatedAt',
]) {}
