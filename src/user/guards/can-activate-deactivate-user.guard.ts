import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { UserService } from '../user.service';

@Injectable()
export class CanActivateDeactivateUserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userByUsername = request.userByUsername;

    if (user.username === userByUsername.username) {
      throw new BadRequestException(
        'You cannot perform this action on yourself'
      );
    }

    if (userByUsername.admin && !user?.superuser) {
      throw new UnauthorizedException('This action requires superuser.');
    }

    return true;
  }
}
