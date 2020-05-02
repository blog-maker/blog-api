import { OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class CreatedUserDto extends OmitType(UserDto, [
  'password',
  'accessFailedCount',
  'lockoutEnd',
]) {}
