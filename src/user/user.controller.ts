import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBearerAuth,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';

import {
  ApiDefaultInternalServerErrorResponse,
  ApiDefaultUnauthorizedResponse,
  ApiDefaultConflictResponse,
  ApiDefaultNotFoundResponse,
} from '../core/swagger/decorators';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserSchema } from './dto/validations/create-user-schema';
import { YupValidationPipe } from '../core/validation/yup-validation.pipe';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import { UserByUsernameGuard } from './guards/user-by-username.guard';
import { UserByUsername } from './decorators/user-by-username.decorator';
import { UserByUserNameDto } from './dto/user-by-username.dto';

@ApiTags('users')
@Controller('users')
@ApiDefaultInternalServerErrorResponse()
@ApiDefaultUnauthorizedResponse()
@UseGuards(JwtAuthGuard, IsAdminGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'create user',
    description: 'Create a user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreateUserDto })
  @ApiDefaultConflictResponse()
  @Post()
  createUser(
    @Body(new YupValidationPipe(CreateUserSchema)) createUser: CreateUserDto
  ) {
    return this.userService.save(createUser);
  }

  @ApiOperation({
    summary: 'get user by username',
    description: 'Get user by specified username',
  })
  @ApiOkResponse({ type: UserByUserNameDto })
  @ApiDefaultNotFoundResponse()
  @Get(':username')
  @ApiParam({ name: 'username', type: String })
  @UseGuards(UserByUsernameGuard)
  getUserByUserName(@UserByUsername() user: UserByUserNameDto) {
    return user;
  }

  @ApiOperation({
    summary: 'activate user',
    description: 'Activate a user',
  })
  @ApiNoContentResponse({ description: 'User activated with success.'})
  @ApiDefaultNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':username/activate')
  @ApiParam({ name: 'username', type: String })
  @UseGuards(UserByUsernameGuard)
  async activateUser(@UserByUsername() user: UserByUserNameDto) {
    await this.userService.activate(user._id);
  }
}
