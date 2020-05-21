import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { MailerConfig } from '../core/domain/interfaces';

@Injectable()
export class MailerConfigRepository {
  constructor(
    @InjectModel('MailerConfig')
    private readonly mailerConfigModel: Model<MailerConfig>
  ) {}

  findOne() {
    return this.mailerConfigModel.findOne().exec();
  }

  async persist(mailerConfig: any) {
    const doc = await this.findOne();

    if (doc) {
      return this.mailerConfigModel.findByIdAndUpdate(doc._id, mailerConfig, {
        new: true,
      });
    }

    const newMailerConfig = new this.mailerConfigModel(mailerConfig);
    return newMailerConfig.save();
  }
}
