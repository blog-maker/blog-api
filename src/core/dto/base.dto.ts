import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface DocumentDto {
  _id: string;
}

export class TimestampDto {
  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}

export class CustomAttributeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class BaseDto extends TimestampDto implements DocumentDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  isActive: boolean;

  @ApiPropertyOptional({ type: [CustomAttributeDto] })
  customAttributes?: [CustomAttributeDto];

  @ApiPropertyOptional()
  extensionsAttributes?: any;
}
