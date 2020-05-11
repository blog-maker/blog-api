import { Injectable, BadRequestException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHashService } from '../core/services/password-hash.service';
import { UsernameAlreadyExistsException } from './exceptions/username-already-exists.exception';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: PasswordHashService,
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
        customAttributes: u?.customAttributes,
        extensionsAttributes: u?.extensionsAttributes,
      }));
  }

  findByUserName(username: string) {
    return this.userRepository.findByUserName(username);
  }

  activate(_id: string) {
    return this.userRepository.findByIdAndUpdate(_id, { isActive: true });
  }

  deactivate(_id: string) {
    return this.userRepository.findByIdAndUpdate(_id, { isActive: false });
  }

  async changePassword(changePasswordDto: ChangePasswordDto, username: string) {
    const user = await this.findByUserName(username);

    const passwordsMatch = await this.bcryptService.compare(
      changePasswordDto.currentPassword,
      user.password
    );

    if (!passwordsMatch) {
      throw new BadRequestException('Current and user passwords do not match.');
    }

    const newPasswordHash = this.bcryptService.hash(
      changePasswordDto.newPassword
    );

    return this.userRepository.findByIdAndUpdate(user._id, {
      password: newPasswordHash,
    });
  }
}
