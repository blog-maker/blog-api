import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import {
  ApiDefaultInternalServerErrorResponse,
  ApiDefaultUnauthorizedResponse,
} from '../core/swagger/decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseJoiValidation } from 'src/core/validation/use-joi-validation.decorator';
import { CreateUserSchema } from './dto/validations/create-user-schema';

@ApiTags('users')
@Controller('users')
@ApiDefaultInternalServerErrorResponse()
@ApiDefaultUnauthorizedResponse()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'create user',
    description: 'Create an user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreateUserDto })
  @UseJoiValidation(CreateUserSchema)
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.save(createUser);
  }
}
