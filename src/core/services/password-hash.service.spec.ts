import { PasswordHashService } from './password-hash.service';
import { Test } from '@nestjs/testing';

describe('PasswordHashService', () => {
  let passwordHashService: PasswordHashService;
  let password = 'user@123';

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [PasswordHashService],
    }).compile();

    passwordHashService = testingModule.get(PasswordHashService);
  });

  it('should hash the password', () => {
    const passwordData = passwordHashService.hash(password);

    expect(passwordData.salt).not.toBeNull();
    expect(passwordData.iterations).not.toBeNull();
    expect(passwordData.hash).not.toBeNull();
  });

  it('passwords should be the same', () => {
    const passwordData = passwordHashService.hash(password);

    const passwordsMatch = passwordHashService.compare(password, passwordData);

    expect(passwordsMatch).toBeTruthy();
  });
});
