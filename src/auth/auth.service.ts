import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { PasswordHashService } from '../core/services/password-hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordHashService: PasswordHashService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);

    if (!user) {
      return null;
    }

    const passwordMatch = this.passwordHashService.compare(
      password,
      user.password
    );

    if (passwordMatch) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { username: sub, _id, firstName, lastName, admin, superuser } = user;
    const payload = { sub, _id, firstName, lastName, admin, superuser };

    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
    };
  }
}
