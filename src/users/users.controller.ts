import { Controller, Get, Post, Delete, Put, Body, Param, Query } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersDTO} from './users.dto'

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}
  @Get()
  readByLog(@Query('login') login: string,
  @Query('password') password: string) {
    return this.UserService.readByLog(login,password);
  }

  @Post()
  createUser(@Body() data: UsersDTO): Promise<UsersEntity>{ 
    return this.UserService.create(data);
  }

  @Get(':id')
  readuser(@Param('id') id:string) {
    return this.UserService.read(id);
  }

  @Put()
  updateUser(@Param('id') id:string, @Body() data) {
    return this.UserService.update(id, data)
  }

  @Delete(':id')
  destroyUser(@Param('id') id: string) {
    return this.UserService.destroy(id)
  }
}
