import { Module } from '@nestjs/common';
import { MongooseModelModule } from './mongoose-model/mongoose-model.module';

@Module({
  imports: [MongooseModelModule.forRoot()],
})
export class DatabaseModule {}
