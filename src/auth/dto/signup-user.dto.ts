import { PartialType } from '@nestjs/mapped-types'
import { SigninUserDto } from './signin-user.dto'

export class SignUpUserDto extends PartialType(SigninUserDto) {}
