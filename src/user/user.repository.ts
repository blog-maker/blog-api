import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../core/domain/interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  save(user: any): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
