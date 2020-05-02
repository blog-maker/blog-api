import { Injectable, BadRequestException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async save(authenticatedUser: any, user: CreateUserDto) {
    if (!authenticatedUser.admin) {
      throw new BadRequestException(`Only administrators can create users`);
    }

    const usernameAlreadyExists = await this.userRepository.findByUserName(
      user.username
    );

    if (usernameAlreadyExists) {
      throw new BadRequestException(
        `username (${user.username}) already exists.`
      );
    }

    return this.userRepository.save(user).then(u => ({
      _id: u._id,
      username: u.username,
      normalizedUsername: u.normalizedUserName,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      normalizedEmail: u.normalizedEmail,
      phoneNumber: u.phoneNumber,
      admin: u.admin,
      lockoutEnabled: u.lockoutEnabled,
    }));
  }
}
