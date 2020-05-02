import { Module, DynamicModule, Type } from '@nestjs/common';
import { MongooseModule, ModelDefinition } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({})
export class MongooseModelModule implements DynamicModule {
  module: Type<any>;

  static forRoot(): DynamicModule {
    return {
      module: MongooseModelModule,
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
    };
  }

  static forFeature(models?: ModelDefinition[]): DynamicModule {
    return {
      module: MongooseModelModule,
      imports: [MongooseModule.forFeature(models)],
      exports: [MongooseModule],
    };
  }
}
