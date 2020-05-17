import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
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
import { UserByUsername } from './decorators/user-by-username.decorator';
import { UserByUserNameDto } from './dto/user-by-username.dto';
import { AuthenticatedUser } from '../auth/authenticated-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordSchema } from './dto/validations/change-password-schema';
import {
  UserByUsernameGuard,
  CanActivateDeactivateUserGuard,
  CanRemoveUserGuard,
} from './guards';

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
    summary: 'change passowrd',
    description: 'Change password from the logged user.',
  })
  @ApiBody({ type: ChangePasswordDto })
  @ApiNoContentResponse({ description: 'Password changed with success.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('mine/change-password')
  async changePassword(
    @Body(new YupValidationPipe(ChangePasswordSchema))
    changePassword: ChangePasswordDto,
    @AuthenticatedUser() authenticatedUser: any
  ) {
    await this.userService.changePassword(
      changePassword,
      authenticatedUser.username
    );
  }

  @ApiOperation({
    summary: 'activate user',
    description: 'Activate a user',
  })
  @ApiNoContentResponse({ description: 'User activated with success.' })
  @ApiDefaultNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':username/activate')
  @ApiParam({ name: 'username', type: String })
  @UseGuards(UserByUsernameGuard, CanActivateDeactivateUserGuard)
  async activateUser(
    @UserByUsername()
    user: UserByUserNameDto
  ) {
    await this.userService.activate(user._id);
  }

  @ApiOperation({
    summary: 'deactivate user',
    description: 'deactivate a user',
  })
  @ApiNoContentResponse({ description: 'User deactivated with success.' })
  @ApiDefaultNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':username/deactivate')
  @ApiParam({ name: 'username', type: String })
  @UseGuards(UserByUsernameGuard, CanActivateDeactivateUserGuard)
  async deactivateUser(
    @UserByUsername()
    user: UserByUserNameDto
  ) {
    await this.userService.deactivate(user._id);
  }

  @ApiOperation({
    summary: 'remove user',
    description: 'Remove a user',
  })
  @ApiNoContentResponse({ description: 'User removed with success.' })
  @ApiDefaultNotFoundResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':username')
  @ApiParam({ name: 'username', type: String })
  @UseGuards(UserByUsernameGuard, CanRemoveUserGuard)
  async removeUser(
    @UserByUsername()
    user: UserByUserNameDto
  ) {
    await this.userService.removeById(user._id);
  }
}
