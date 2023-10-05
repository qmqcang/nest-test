import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('range')
  getRange(@Query('n') n: number) {
    if (!n || n <= 0) return { msg: '请输入正确格式如：/range?n=5' }

    return this.appService.getRange(n)
  }
}
