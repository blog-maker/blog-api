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
import { UseYupValidation } from 'src/core/validation/use-yup-validation.decorator';
import { CreateUserSchema } from './dto/validations/create-user-schema';
import { CreatedUserDto } from './dto/created-user.dto';

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
  @ApiOkResponse({ type: CreatedUserDto })
  @UseYupValidation(CreateUserSchema)
  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.save(createUser);
  }
}
