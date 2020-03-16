import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CountersService } from './counters.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('counters')
export class CountersController {
  constructor(
    private readonly CountersService: CountersService,
    private readonly authService: AuthService
    ) {}

  @Post()
  createNote(@Body() data){  
    // return this.CountersService.create(data);
  }

  @Get('')
  readNote(@Param('id') id:string) {
    // return this.CountersService.read(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateNote(@Param('id') id:string, @Body() data, @Request() req) {
    return this.CountersService.update(id, {
      ...data,
       userId: req.user.userId
      })
  }

  @Delete('')
  destroyNote(@Param('id') id: string) {
    // return this.CountersService.destroy(id)
  }
}