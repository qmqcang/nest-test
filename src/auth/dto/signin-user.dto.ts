import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message:
      '$property的长度必须满足$constraint1-$constraint2个字符，当前的值为：$value'
  })
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 64, {
    message:
      '$property的长度必须满足$constraint1-$constraint2个字符，当前的值为：$value'
  })
  password: string
}
