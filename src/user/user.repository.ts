import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../core/domain/interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  save(user: any): Promise<User> {
    const userNormalized = {
      ...user,
      normalizedUserName: user.username.toUpperCase(),
      normalizedEmail: user.email.toUpperCase(),
    };
    const newUser = new this.userModel(userNormalized);
    return newUser.save();
  }

  findByUserName(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  findOne(query: any) {
    return this.userModel.findOne(query).exec();
  }

  findByIdAndUpdate(_id: string, user: any) {
    return this.userModel.findByIdAndUpdate(_id, user, { new: true });
  }

  findByIdAndRemove(_id: string) {
    return this.userModel.findByIdAndRemove(_id);
  }
}
