import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'
import { Roles } from 'src/roles/roles.entity'
import type { getUserDto } from './dto/get-user.dto'
import { conditionUtils } from 'src/utils/db.helper'
import * as argen2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Roles) private readonly rolesRepository: Repository<Roles>
  ) {}

  async findAll({
    page = 1,
    limit: take = 10,
    username,
    gender,
    role
  }: getUserDto) {
    const skip = (page - 1) * take

    /* return this.userRepository.find({
      select: {
        id: true,
        username: true,
        profile: {
          gender: true
        }
      },
      relations: ['profile', 'roles'],
      skip,
      take,
      where: {
        username,
        profile: {
          gender
        },
        roles: {
          id: role
        }
      }
    }) */

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles')

    const newQueryBuilder = conditionUtils<User>(queryBuilder, {
      'user.username': username,
      'profile.gender': gender,
      'roles.id': role
    })

    return newQueryBuilder
      .select(['user.id', 'user.username', 'profile', 'roles'])
      .skip(skip)
      .take(take)
      .getManyAndCount()
  }

  find(username: string) {
    return this.userRepository.findOne({
      where: { username }
    })
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['roles']
    })
  }

  async create(user: Partial<User>) {
    if (!user.roles || !user.roles.length) {
      const role = await this.rolesRepository.findOne({
        where: {
          id: 2
        }
      })

      user.roles = [role]
    }
    if (Array.isArray(user.roles) && Number.isInteger(user.roles[0])) {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles)
        }
      })
    }
    const U = this.userRepository.create(user)

    // 密码加密
    U.password = await argen2.hash(U.password)

    return await this.userRepository.save(U)
  }

  async update(id: number, user: Partial<User>) {
    if (Array.isArray(user.roles) && Number.isInteger(user.roles[0])) {
      user.roles = await this.rolesRepository.find({
        where: {
          id: In(user.roles)
        }
      })
    }
    const userTemp = await this.findProfile(id)
    const newUser = this.userRepository.merge(userTemp, user)

    newUser.password = await argen2.hash(newUser.password)

    return this.userRepository.save(newUser)
  }

  async remove(id: number) {
    const user = await this.findOne(id)

    return this.userRepository.remove(user)
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true }
    })
  }

  async findLogs(id: number) {
    const user = await this.findOne(id)

    return this.logsRepository.find({
      where: {
        user: {
          id
        }
      },
      relations: {
        user: true
      }
    })
  }

  async findLogsByGroup(id: number) {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT("result")', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('result')
      .orderBy('result', 'ASC')
      .getRawMany()
      .then((res) => {
        return res.map(({ result, count }) => ({
          result,
          count
        }))
      })
  }
}
