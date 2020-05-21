import { Controller, UseGuards, Get, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBody } from '@nestjs/swagger';

import {
  ApiDefaultInternalServerErrorResponse,
  ApiDefaultUnauthorizedResponse,
  ApiDefaultNotFoundResponse,
} from '../core/swagger/decorators';
import { YupValidationPipe } from '../core/validation/yup-validation.pipe';
import { MailerConfigService } from './mailer-config.service';
import { JwtAuthGuard, IsSuperuserGuard } from '../auth/guards';
import { MailerConfigDto, PersistMailerConfigDto } from './dto';
import { CreateMailerConfigSchema } from './dto/validations/create-mailer-config.schema';

@ApiTags('mailer-config')
@Controller('mailer-config')
@ApiDefaultInternalServerErrorResponse()
@ApiDefaultUnauthorizedResponse()
@UseGuards(JwtAuthGuard, IsSuperuserGuard)
export class MailerConfigController {
  constructor(private readonly mailerConfigService: MailerConfigService) {}

  @ApiOperation({
    summary: 'get mailer config',
    description: 'Get mailer config.',
  })
  @ApiOkResponse({ type: MailerConfigDto })
  @ApiDefaultNotFoundResponse()
  @Get()
  getMailerConfig() {
    return this.mailerConfigService.getConfig();
  }

  @ApiOperation({
    summary: 'create or update mailer config',
    description: 'Create or Update Mailer config',
  })
  @ApiBody({ type: PersistMailerConfigDto })
  @ApiOkResponse({ type: MailerConfigDto })
  @Put()
  persist(
    @Body(new YupValidationPipe(CreateMailerConfigSchema))
    mailerConfig: PersistMailerConfigDto
  ) {
    return this.mailerConfigService.persist(mailerConfig);
  }
}
