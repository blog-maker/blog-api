import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModelModule } from '../core/database/mongoose-model/mongoose-model.module';
import { UserMongooseModel } from '../core/database/mongoose-model/models/user.model';
import { PasswordHashService } from '../core/services/password-hash.service';

@Module({
  imports: [MongooseModelModule.forFeature([UserMongooseModel])],
  providers: [UserService, UserRepository, PasswordHashService],
  controllers: [UserController],
})
export class UserModule {}
