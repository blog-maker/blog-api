import { ConflictException } from "@nestjs/common";

export class UsernameAlreadyExistsException extends ConflictException {
  constructor(public readonly username: string) {
    super(null, `Usename [${username}] already exists`)
  }
}
