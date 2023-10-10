import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'
import type { getUserDto } from './dto/get-user.dto'
import { conditionUtils } from 'src/utils/db.helper'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  findAll({ page, limit: take = 10, username, gender, role }: getUserDto) {
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

    return newQueryBuilder.skip(skip).take(take).getMany()
  }

  find(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { logs: true }
    })
  }

  async create(user: User) {
    const U = this.userRepository.create(user)

    return await this.userRepository.save(U)
  }

  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user)
  }

  remove(id: number) {
    return this.userRepository.delete(id)
  }

  findProfile(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { profile: true }
    })
  }

  async findLogs(id: number) {
    const user = await this.find(id)

    return this.logsRepository.find({
      where: { user },
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
