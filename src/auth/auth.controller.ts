import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthorizeDto } from './dto/authorize.dto';
import { JsonWebToken } from './dto/json-web-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'authorize', description: 'Generate JWT for Bearer authorization.' })
  @ApiBody({ type: AuthorizeDto })
  @ApiOkResponse({ type: JsonWebToken })
  @ApiUnauthorizedResponse()
  @UseGuards(LocalAuthGuard)
  @Post('authorize')
  authorize(@Req() req) {
    return this.authService.login(req.user);
  }
}
