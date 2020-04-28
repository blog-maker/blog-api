import { Controller, Post, Req, UseGuards, HttpCode } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ProblemDetails } from '../core/problem-details/problem-details.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthorizeDto } from './dto/authorize.dto';
import { JsonWebToken } from './dto/json-web-token.dto';

@ApiTags('auth')
@Controller('auth')
@ApiInternalServerErrorResponse({ type: ProblemDetails })
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'authorize',
    description: 'Generate JWT for Bearer authorization.',
  })
  @ApiBody({ type: AuthorizeDto })
  @ApiOkResponse({ type: JsonWebToken })
  @ApiUnauthorizedResponse({ type: ProblemDetails })
  @UseGuards(LocalAuthGuard)
  @Post('authorize')
  @HttpCode(200)
  authorize(@Req() req) {
    return this.authService.login(req.user);
  }
}
