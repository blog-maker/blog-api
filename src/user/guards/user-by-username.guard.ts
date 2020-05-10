import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserService } from '../user.service';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class UserByUsernameGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const username = request.params['username'];
    const user = await this.userService.findByUserName(username);

    if (!user) {
      throw new UserNotFoundException(username);
    }

    const {
      _id,
      admin,
      isActive,
      firstName,
      lastName,
      email,
      normalizedEmail,
      normalizedUserName,
      customAttributes,
      createdAt,
      updatedAt,
      extensionsAttributes,
    } = user;

    request.userByUsername = {
      _id,
      username,
      email,
      firstName,
      lastName,
      admin,
      isActive,
      normalizedEmail,
      normalizedUserName,
      customAttributes,
      extensionsAttributes,
      createdAt,
      updatedAt,
    };
    return true;
  }
}
