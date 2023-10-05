import * as dotenv from 'dotenv'
import * as joi from 'joi'
import { join } from 'node:path'
import { Module, Logger, Global } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoggerModule } from 'nestjs-pino'

import { AppService } from './app.service'
import { AppController } from './app.controller'

import { UserModule } from './user/user.module'
import { LogsModule } from './logs/logs.module'


import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import Configuration from './configuration'
import ormconfig from '../ormconfig'

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      //   load: [Configuration],
      validationSchema: joi.object({
        DB_TYPE: joi.string().valid('mysql'),
        DB_PORT: joi.number().default(3333),
        DB_HOST: joi.string().ip(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
        DB_SYNCHRONIZE: joi.string().default(false)
      })
    }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    LogsModule,
    RolesModule
    // LoggerModule.forRoot({
    //   pinoHttp: {
    //     transport: {
    //       targets: [
    //         process.env.NODE_ENV === 'development'
    //           ? {
    //               level: 'info',
    //               target: 'pino-pretty',
    //               options: {
    //                 colorize: true
    //               }
    //             }
    //           : {
    //               level: 'info',
    //               target: 'pino-roll',
    //               options: {
    //                 file: join('logs', 'log.txt'),
    //                 frequency: 'daily',
    //                 mkdir: true
    //               }
    //             }
    //       ]
    //     }
    //   }
    // })
  ],
  controllers: [AppController, RolesController],
  providers: [AppService, Logger, RolesService],
  exports: [Logger]
})
export class AppModule {}
