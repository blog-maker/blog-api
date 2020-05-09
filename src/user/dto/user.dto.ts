import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { BaseDto } from '../../core/dto/base.dto';

export class UserDto extends PartialType(BaseDto) {
  @ApiProperty()
  username: string;

  @ApiProperty()
  normalizedUserName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  normalizedEmail: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  phoneNumber: string;

  @ApiProperty()
  admin: boolean;

  @ApiPropertyOptional()
  lockoutEnabled: boolean;

  @ApiPropertyOptional()
  accessFailedCount: number;

  @ApiPropertyOptional()
  lockoutEnd: Date;
}
