import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { CountersService } from './counters.service';

@Controller('counters')
export class CountersController {
  constructor(
    private readonly CountersService: CountersService
    ) {}

  @Post()
  createNote(@Body() data){  
    // return this.CountersService.create(data);
  }

  @Get('')
  readNote(@Param('id') id:string) {
    // return this.CountersService.read(id);
  }
  
  @Put(':id')
  updateNote(@Param('id') id:string, @Body() data) {
    return this.CountersService.update(id, data)
  }

  @Delete('')
  destroyNote(@Param('id') id: string) {
    // return this.CountersService.destroy(id)
  }
}