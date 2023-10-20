import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const user = await this.userService.findOne(req.user.id)

    if (user.roles.findIndex((role) => role.id === 1) === -1) {
      return false
    }

    return true
  }
}
