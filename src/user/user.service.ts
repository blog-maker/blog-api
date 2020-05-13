import { Injectable, BadRequestException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHashService } from '../core/services/password-hash.service';
import { UsernameAlreadyExistsException } from './exceptions/username-already-exists.exception';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly passwordHashService: PasswordHashService,
    private readonly userRepository: UserRepository
  ) {}

  async save(user: CreateUserDto) {
    const usernameAlreadyExists = await this.userRepository.findByUserName(
      user.username
    );

    if (usernameAlreadyExists) {
      throw new UsernameAlreadyExistsException(user.username);
    }

    const passwordData = this.passwordHashService.hash(user.password);

    return this.userRepository
      .save({ ...user, password: passwordData, superuser: false })
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

  async createSuperUserIfNotExists(superUser: any) {
    const su = await this.userRepository.findOne({ superuser: true });

    if (su) {
      return;
    }

    const passwordData = this.passwordHashService.hash(superUser.password);
    await this.userRepository.save({ ...superUser, password: passwordData });
  }

  findByUserName(username: string) {
    return this.userRepository.findByUserName(username);
  }

  findOne(query: any) {
    return this.userRepository.findOne(query);
  }

  activate(_id: string) {
    return this.userRepository.findByIdAndUpdate(_id, { isActive: true });
  }

  deactivate(_id: string) {
    return this.userRepository.findByIdAndUpdate(_id, { isActive: false });
  }

  async changePassword(changePasswordDto: ChangePasswordDto, username: string) {
    const user = await this.findByUserName(username);

    const passwordsMatch = await this.passwordHashService.compare(
      changePasswordDto.currentPassword,
      user.password
    );

    if (!passwordsMatch) {
      throw new BadRequestException('Current and user passwords do not match.');
    }

    const newPasswordHash = this.passwordHashService.hash(
      changePasswordDto.newPassword
    );

    return this.userRepository.findByIdAndUpdate(user._id, {
      password: newPasswordHash,
    });
  }
}
