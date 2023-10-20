import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signin(username: string, password: string) {
    const user = await this.userService.find(username)

    if (!user) {
      throw new ForbiddenException('用户不存在，请注册')
    }

    const isValid = await argon2.verify(user.password, password)

    if (!isValid) {
      throw new ForbiddenException('账号或密码错误，请重新输入')
    }

    return await this.jwtService.signAsync(
      {
        username: user.username,
        sub: user.id
      }
      // 局部设置
      // {
      //   expiresIn: '1d'
      // }
    )
  }

  async signup(username: string, password: string) {
    const user = await this.userService.find(username)

    if (user) {
      throw new ForbiddenException('用户已存在，请重新输入')
    }

    const newUser = await this.userService.create({
      username,
      password
    })

    return newUser
  }
}
