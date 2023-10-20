import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigEnum } from 'src/enum/config.menu'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.SECRET)
    })
  }

  async validate(payload: any) {
    // 验证成功之后，会向 @Req 中添加自定义的返回数据
    return { id: payload.sub, username: payload.username }
  }
}
