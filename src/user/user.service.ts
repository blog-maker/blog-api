import { Injectable, BadRequestException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BCryptService } from '../core/services/bcrypt.service';

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
      throw new BadRequestException(
        `username (${user.username}) already exists.`
      );
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
      }));
  }
}
