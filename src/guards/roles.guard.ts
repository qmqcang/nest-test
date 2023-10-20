import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const res = context.switchToHttp().getRequest()
    const user = await this.userService.findOne(res.user.id)
    const roles = this.reflector.get<number[] | number>(
      'roles',
      context.getHandler()
    )

    if (
      typeof roles === 'number' &&
      user.roles.some((role) => roles === role.id)
    ) {
      return true
    } else if (
      roles instanceof Array &&
      user.roles.some((role) => roles.includes(role.id))
    ) {
      return true
    }

    return false
  }
}
