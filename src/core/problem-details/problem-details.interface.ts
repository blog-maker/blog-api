import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ProblemDetails {
  @ApiProperty()
  readonly type?: string;

  @ApiPropertyOptional()
  readonly title?: string;

  @ApiProperty()
  readonly status?: number;

  @ApiPropertyOptional()
  readonly detail?: string;

  @ApiProperty()
  readonly instance?: string;
}
