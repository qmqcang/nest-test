import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  getRange(n: number) {
    return Array.from({ length: n }, (_, i) => String(i + 1))
  }
}
