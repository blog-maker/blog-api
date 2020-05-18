import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CanRemoveUserGuard implements CanActivate {

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authenticatedUser = request.user;
    const userByUsername = request.userByUsername;

    if (userByUsername.superuser) {
      throw new BadRequestException('Superuser cannot be deleted.');
    }

    if (userByUsername.admin && !authenticatedUser?.superuser) {
      throw new UnauthorizedException('This action requires superuser.');
    }

    return true;
  }
}
