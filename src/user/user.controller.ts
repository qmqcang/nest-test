import {
  Body,
  Query,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Inject,
  UseFilters,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'
import { User } from './user.entity'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { TypeormFilter } from 'src/filters/typeorm.filter'
import type { getUserDto } from './dto/get-user.dto'

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  // private logger = new Logger(UserController.name)

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) {
    this.logger.log('UserController init')
  }

  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    this.logger.log('请求成功！')
    return this.userService.find(id)
  }

  @Post()
  addUser(@Body() user: User) {
    return this.userService.create(user)
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.remove(id)
  }

  @Get(':id/profile')
  getUserProfile(@Param('id') id: number) {
    return this.userService.findProfile(id)
  }

  @Get(':id/logs')
  getUserLogs(@Param('id') id: number) {
    return this.userService.findLogs(id)
  }

  @Get(':id/logsByGroup')
  getUserLogsByGroup(@Param('id') id: number) {
    return this.userService.findLogsByGroup(id)
  }
}
