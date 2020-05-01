import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const enableSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Blog Api')
    .setDescription('The API for amazing blogs')
    .setVersion('1.0')
    .addTag('auth')
    .setContact(
      'Bruno Xavier',
      'https://github.com/brunoSpeedrun',
      'bruno.xavier.moura.dev@gmail.com'
    )
    .addBearerAuth({
      name: 'Authorization',
      description: `
JWT Authorization header using the Bearer scheme.

Enter 'Bearer' [space] and then your token in the text input below.

Example: Bearer 12345abcdef`,
      type: 'apiKey',
      scheme: 'Bearer',
      in: 'header',
      bearerFormat: 'Bearer ',
    })
    .addSecurityRequirements('Authorization', ['Bearer'])
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-ui', app, document);
};
