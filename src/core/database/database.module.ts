import { Module } from '@nestjs/common';
import { MongooseModelModule } from './mongoose-model/mongoose-model.module';

@Module({
  imports: [MongooseModelModule.forRoot()],
  exports: [MongooseModelModule],
})
export class DatabaseModule {}
