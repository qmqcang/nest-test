import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseFilters,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninUserDto } from './dto/signin-user.dto'
import { SignUpUserDto } from './dto/signup-user.dto'
import { TypeormFilter } from '../filters/typeorm.filter'
import { SerializeInterceptor } from '../interceptors/serialize.interceptor'

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SigninUserDto) {
    const { username, password } = dto

    const token = await this.authService.signin(username, password)

    return {
      access_token: token
    }
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  signup(@Body() dto: SignUpUserDto) {
    const { username, password } = dto

    return this.authService.signup(username, password)
  }
}
