import {
  AfterRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { Logs } from 'src/logs/logs.entity'
import { Roles } from 'src/roles/roles.entity'
import { Profile } from './profile.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude()
  password: string

  @OneToMany(() => Logs, (logs) => logs.user, { cascade: true })
  logs: Logs[]

  @ManyToMany(() => Roles, (roles) => roles.users, { cascade: ['insert'] })
  @JoinTable({ name: 'users_roles' })
  roles: Roles[]

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile

  @AfterRemove()
  afterRemove() {
    console.log('已删除：', this.username)
  }

  @BeforeUpdate()
  afterUpdate() {
    console.log('已更新：', this.username)
  }
}
