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
import { CreateUserSchema } from './dto/validations/create-user-schema';
import { CreatedUserDto } from './dto/created-user.dto';
import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { YupValidationPipe } from '../core/validation/yup-validation.pipe';

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
    description: 'Create a user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreatedUserDto })
  @Post()
  createUser(
    @AuthenticatedUser() authenticatedUser,
    @Body(new YupValidationPipe(CreateUserSchema)) createUser: CreateUserDto
  ) {
    return this.userService.save(authenticatedUser, createUser);
  }
}
