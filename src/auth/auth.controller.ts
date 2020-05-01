import { Controller, Post, Req, UseGuards, HttpCode } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthorizeDto } from './dto/authorize.dto';
import { JsonWebToken } from './dto/json-web-token.dto';
import { ApiDefaultInternalServerErrorResponse } from '../core/swagger/decorators';

@ApiTags('auth')
@Controller('auth')
@ApiDefaultInternalServerErrorResponse()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'authorize',
    description: 'Generate JWT for Bearer authorization.',
  })
  @ApiBody({ type: AuthorizeDto })
  @ApiOkResponse({ type: JsonWebToken })
  @UseGuards(LocalAuthGuard)
  @Post('authorize')
  @HttpCode(200)
  authorize(@Req() req) {
    return this.authService.login(req.user);
  }
}
