import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CanUpdateUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authenticatedUser = request.user;
    const userToUpdate = request.userByUsername;
    const updateUser = request.body;

    if (userToUpdate.superuser && !authenticatedUser.superuser) {
      throw new UnauthorizedException('This action requires superuser.');
    }

    if (
      userToUpdate.admin &&
      authenticatedUser.superuser === false &&
      updateUser.admn === false
    ) {
      throw new UnauthorizedException(
        'Rquires superuser to revoke admnistrator.'
      );
    }

    return true;
  }
}
