import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerConfigRepository } from './mailer-config.repository';

@Injectable()
export class MailerConfigService {
  constructor(
    private readonly mailerConfigRepository: MailerConfigRepository
  ) {}

  async getConfig() {
    const config = await this.mailerConfigRepository.findOne();

    if (!config) {
      throw new NotFoundException();
    }

    return config;
  }

  persist(mailerConfig: any) {
    return this.mailerConfigRepository.persist(mailerConfig);
  }
}
