import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomAttributeDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

export class BaseDto {
  @ApiProperty()
  isActive: boolean;

  @ApiPropertyOptional({ type: [CustomAttributeDto] })
  customAttributes: [CustomAttributeDto];

  @ApiPropertyOptional()
  extensionsAttributes: any;

  @ApiPropertyOptional()
  createdAt: Date;

  @ApiPropertyOptional()
  updatedAt: Date;
}
