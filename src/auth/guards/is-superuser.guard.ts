import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { RequiresSuperuserException } from '../../core/exceptions';

@Injectable()
export class IsSuperuserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.superuser) {
      throw new RequiresSuperuserException();
    }

    return true;
  }
}
