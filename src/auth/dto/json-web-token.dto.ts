import { ApiProperty } from '@nestjs/swagger';

export class JsonWebToken {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({ default: 'Bearer' })
  tokenType = 'Bearer';
}
