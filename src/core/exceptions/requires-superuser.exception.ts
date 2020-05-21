import { UnauthorizedException } from '@nestjs/common';

export class RequiresSuperuserException extends UnauthorizedException {
  constructor() {
    super(null, 'This action requires superuser.');
  }
}
