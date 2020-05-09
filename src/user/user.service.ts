import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BCryptService } from '../core/services/bcrypt.service';
import { UsernameAlreadyExistsException } from './exceptions/username-already-exists.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BCryptService,
    private readonly userRepository: UserRepository
  ) {}

  async save(user: CreateUserDto) {
    const usernameAlreadyExists = await this.userRepository.findByUserName(
      user.username
    );

    if (usernameAlreadyExists) {
      throw new UsernameAlreadyExistsException(user.username);
    }

    const passwordHash = await this.bcryptService.hash(user.password);

    return this.userRepository
      .save({ ...user, password: passwordHash })
      .then(u => ({
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phoneNumber: u.phoneNumber,
        admin: u.admin,
        lockoutEnabled: u.lockoutEnabled,
        customAttributes: u.customAttributes,
        extensionsAttributes: u.extensionsAttributes,
      }));
  }

  findByUserName(username: string) {
    return this.userRepository.findByUserName(username);
  }

  activate(_id: string) {
    return this.userRepository.updateById(_id, { isActive: true });
  }
}
