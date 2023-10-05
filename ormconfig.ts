import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Logs } from 'src/logs/logs.entity'
import { Roles } from 'src/roles/roles.entity'
import { Profile } from 'src/user/profile.entity'
import { User } from 'src/user/user.entity'

export default {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3333,
  username: 'root',
  password: 'example',
  database: 'testdb',
  synchronize: true,
  entities: [User, Profile, Roles, Logs],
  logging: false
} as TypeOrmModuleOptions
