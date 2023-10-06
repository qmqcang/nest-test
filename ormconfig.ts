import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as fs from 'node:fs'
import * as dotenv from 'dotenv'
import { DatabaseEnum } from 'src/enum/config.menu'

const getEnvConfig = (envFile): Record<string, unknown> => {
  if (fs.existsSync(envFile)) {
    return dotenv.parse(fs.readFileSync(envFile))
  }
  return {}
}

const buildConnectionOptions = (): TypeOrmModuleOptions => {
  const defaultConfig = getEnvConfig('.env')
  const envConfig = getEnvConfig(
    `.env.${process.env.NODE_ENV ?? 'development'}`
  )
  const config = { ...defaultConfig, ...envConfig }

  return {
    type: config[DatabaseEnum.DB_TYPE],
    host: config[DatabaseEnum.DB_HOST],
    port: config[DatabaseEnum.DB_PORT],
    username: config[DatabaseEnum.DB_USERNAME],
    password: config[DatabaseEnum.DB_PASSWORD],
    database: config[DatabaseEnum.DB_DATABASE],
    synchronize: config[DatabaseEnum.DB_SYNCHRONIZE],
    entities:
      process.env.NODE_DEV === 'test'
        ? [__dirname + '/**/*.entity.ts']
        : [__dirname + '/**/*.entity{.ts,.js}'],
    logging: false
  } as TypeOrmModuleOptions
}

export const connectionParams = buildConnectionOptions()

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: []
} as DataSourceOptions)
