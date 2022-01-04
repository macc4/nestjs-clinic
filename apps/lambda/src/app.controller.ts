import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getParametersFromSsmAndLog(): Promise<any> {
    return this.appService.getParametersFromSsmAndLog();
  }
}
