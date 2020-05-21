import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { TimestampDto, DocumentDto } from '../../core/dto/base.dto';

export class MailerCredentialsDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  pass: string;
}

export class SenderDto {
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  pass: string;
}

export class MailerConfigDto extends PartialType(TimestampDto)
  implements DocumentDto {
  @ApiPropertyOptional()
  _id: string;

  @ApiProperty()
  host: string;

  @ApiProperty()
  port: number;

  @ApiProperty()
  secure: boolean;

  @ApiProperty({ type: MailerCredentialsDto })
  auth: MailerCredentialsDto;

  @ApiProperty({ type: SenderDto })
  sender: SenderDto;
}
