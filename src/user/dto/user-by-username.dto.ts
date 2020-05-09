import { OmitType } from '@nestjs/swagger';

import { UserDto } from './user.dto';

export class UserByUserNameDto extends OmitType(UserDto, ['password']) {}
