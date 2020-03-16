import { Controller, Get, Post, Delete, Put, Body, Param, Query, UseGuards,Request } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UsersDTO} from './users.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService,private readonly authService: AuthService,     private readonly jwtService: JwtService,) {}
  @UseGuards(JwtAuthGuard)
  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  async createUser(@Body() data: UsersDTO) { 
    const user = await this.UserService.create(data);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // @Get(':id')
  // readuser(@Param('id') id:string) {
  //   return this.UserService.read(id);
  // }

  // @Put()
  // updateUser(@Param('id') id:string, @Body() data) {
  //   return this.UserService.update(id, data)
  // }

  // @Delete(':id')
  // destroyUser(@Param('id') id: string) {
  //   return this.UserService.destroy(id)
  // }
  
  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
