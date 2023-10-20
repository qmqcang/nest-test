import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import { LogEnum } from '../enum/config.menu'
import { LogsController } from './logs.controller'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          transports: [
            new winston.transports.Console({
              level: 'info',
              format: winston.format.combine(
                winston.format.timestamp(),
                utilities.format.nestLike()
              )
            }),
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  new winston.transports.DailyRotateFile({
                    level: configService.get(LogEnum.LOG_LEVEL),
                    dirname: 'logs',
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    format: winston.format.combine(
                      winston.format.timestamp(),
                      winston.format.simple()
                    )
                  })
                ]
              : [])
          ]
        } as WinstonModuleOptions)
    }),
    LogsModule
  ],
  controllers: [LogsController]
})
export class LogsModule {}
