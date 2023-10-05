import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { Logs } from '../logs/logs.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>
  ) {}

  findAll() {
    return this.userRepository.find()
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
