import { Test, TestingModule } from '@nestjs/testing';

import { MailerConfigService } from './mailer-config.service';
import { MailerConfigRepository } from './mailer-config.repository';

describe('MailerConfigService', () => {
  let mailerConfigService: MailerConfigService;

  const mailerConfigMock = {
    host: 'smtp.test.com',
    port: 567,
    secure: false,
    auth: {
      user: 'user',
      pass: 'pass',
    },
    sender: {
      name: 'teste',
      email: 'teste@mail.com',
    },
  };
  const mailerConfigRepositoryMock = {
    mailerConfig: { ...mailerConfigMock },
    findOne() {
      return Promise.resolve({ ...this.mailerConfig });
    },
    persist(mailerConfig: any) {
      this.mailerConfig = { ...mailerConfig };
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerConfigService, MailerConfigRepository],
    })
      .overrideProvider(MailerConfigRepository)
      .useValue(mailerConfigRepositoryMock)
      .compile();

    mailerConfigService = module.get(MailerConfigService);
  });

  it('should be defined', () => {
    expect(mailerConfigService).toBeDefined();
  });

  it('should get mailer options', async () => {
    const mailerOptions = await mailerConfigService.getConfig();

    expect(mailerOptions).toStrictEqual(mailerConfigMock);
  });

  it('should not found mailer config', async () => {
    jest
      .spyOn(mailerConfigRepositoryMock, 'findOne')
      .mockImplementationOnce(() => Promise.resolve(null));

    try {
      await mailerConfigService.getConfig();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  it('should create or update mailer options', async () => {
    const mailerOptions = {
      host: 'smtp.newhost.com',
      port: 123,
      sender: {
        email: 'newsender@mail.com',
      },
    };

    const mailerConfigUpdated = await mailerConfigService.persist(
      mailerOptions
    );

    expect(mailerConfigUpdated.host).toBe(mailerOptions.host);
    expect(mailerConfigUpdated.port).toBe(mailerOptions.port);
    expect(mailerOptions.sender.email).toBe(mailerOptions.sender.email);
  });
});
