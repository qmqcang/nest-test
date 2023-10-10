import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { AllExceptionFilter } from './filters/all-exception.filter'
import { ConfigEnum } from './enum/config.menu'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {})

  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER)
  const configService = app.get(ConfigService)
  const httpAdapterHost = app.get(HttpAdapterHost)

  const PORT = configService.get(ConfigEnum.PORT)
  const PREFIX = configService.get(ConfigEnum.PREFIX)

  app.enableCors({
    origin: ['http://127.0.0.1:8888']
  })
  app.setGlobalPrefix(PREFIX)
  app.useLogger(winstonLogger)
  // app.useGlobalFilters(new HttpExceptionFilter(winstonLogger))
  app.useGlobalFilters(new AllExceptionFilter(winstonLogger, httpAdapterHost))

  await app.listen(PORT, () => {
    winstonLogger.log(`服务已启动：http://localhost:${PORT}/${PREFIX}`)
  })
}
bootstrap()
