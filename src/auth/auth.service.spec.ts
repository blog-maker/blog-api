import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { v4 as uuidv4 } from 'uuid';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PasswordHashService } from '../core/services/password-hash.service';

describe('AuthService', () => {
  let authService: AuthService;

  const userMock = {
    username: 'admin',
    isActive: true,
  };
  const jwtServiceMock = {
    sign(payload: any) {
      return uuidv4();
    },
  };
  const userServiceMock = {
    findByUserName(username: string) {
      return Promise.resolve(username === userMock.username ? userMock : null);
    },
  };
  const passwordHashServiceMock = {
    compare(password: string, passwordData: any) {
      return password === 'admin';
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, UserService, PasswordHashService],
    })
      .overrideProvider(JwtService)
      .useValue(jwtServiceMock)
      .overrideProvider(UserService)
      .useValue(userServiceMock)
      .overrideProvider(PasswordHashService)
      .useValue(passwordHashServiceMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should perform user login', async () => {
    const user = {
      username: 'Tom',
      _id: uuidv4(),
      firstName: 'Tom',
      lastName: 'Silva',
      admin: false,
      superuser: false,
    };

    const jsonWebToken = await authService.login(user);

    expect(jsonWebToken.accessToken).not.toBeNull();
    expect(jsonWebToken.tokenType).toBe('Bearer');
  });

  it('should not find the user', async () => {
    const user = await authService.validateUser('user', 'user');

    expect(user).toBeNull();
  });

  it('should user be inactive', async () => {
    jest
      .spyOn(userServiceMock, 'findByUserName')
      .mockImplementationOnce(() =>
        Promise.resolve({ ...userMock, isActive: false })
      );

    const user = await authService.validateUser('admin', 'admin');

    expect(user).toBeNull();
  });

  it('should passwords not match', async () => {
    const user = await authService.validateUser('admin', 'user');

    expect(user).toBeNull();
  });

  it('should validade the user', async () => {
    const user = await authService.validateUser('admin', 'admin');

    expect(user).not.toBeNull();
  });
});
