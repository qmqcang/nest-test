import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import 'dotenv/config'

async function bootstrap() {
  // const logger = new Logger('Main')
  const app = await NestFactory.create(AppModule, {})
  const WinstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER)

  app.setGlobalPrefix('api/v1')

  app.useLogger(WinstonLogger)
  app.useGlobalFilters(new HttpExceptionFilter(WinstonLogger))

  await app.listen(3000)

  WinstonLogger.log('服务已启动：http://localhost:3000')
}
bootstrap()
