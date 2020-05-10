import { Controller, Get, Redirect, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  @Redirect('/swagger-ui', HttpStatus.MOVED_PERMANENTLY)
  redirectToSwagger() {}
}
