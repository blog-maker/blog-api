import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const host = configService.get('database.host');
        const port = configService.get('database.port');
        const uri = `mongodb://${host}/${port}`;
        return {
          uri,
          dbName: configService.get('database.name'),
          user: configService.get('database.user'),
          pass: configService.get('database.password'),
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
