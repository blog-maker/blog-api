import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserByUsername = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.userByUsername;
  }
);
