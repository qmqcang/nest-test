import {
  Body,
  Query,
  Headers,
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
  ParseIntPipe,
  UseGuards,
  Req
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserService } from './user.service'
import { User } from './user.entity'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { TypeormFilter } from '../filters/typeorm.filter'
import type { getUserDto } from './dto/get-user.dto'
import { CreateUserPipe } from './pipes/create-user.pipe'
import { CreateUserDto } from './dto/create.user.dto'
import { AdminGuard } from '../guards/admin.guard'
import { JwtGuard } from '../guards/jwt.guard'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../guards/roles.guard'

@Controller('user')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard)
export class UserController {
  // private logger = new Logger(UserController.name)

  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger
  ) {
    this.logger.log('UserController init')
  }

  @Get()
  getUsers(@Query() query: getUserDto) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Post()
  addUser(@Body(CreateUserPipe) user: CreateUserDto) {
    return this.userService.create(user as User)
  }

  @Patch(':id')
  @Roles(1)
  @UseGuards(RolesGuard)
  updateUser(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user)
  }

  @Delete(':id')
  @Roles([1, 3])
  @UseGuards(RolesGuard)
  removeUser(@Param('id') id: number) {
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
