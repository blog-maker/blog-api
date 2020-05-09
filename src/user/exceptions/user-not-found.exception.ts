import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(public readonly username: string) {
    super(null, `User [${username}] does not exist`);
  }
}
