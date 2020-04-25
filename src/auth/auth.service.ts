import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    //TODO: users validation.
    if (username === 'admin' && password === 'admin') {
      const user = { username, password };
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'bearer',
    };
  }
}
