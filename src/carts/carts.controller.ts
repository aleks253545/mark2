
import { Controller, Get, Post, Delete, Put, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsEntity} from './carts.entity';
import CardsDTO from './carts.dto';
import { AuthService} from '../auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBasicAuth } from '@nestjs/swagger/dist/decorators/api-basic.decorator';
import { ApiHeader } from '@nestjs/swagger/dist/decorators/api-header.decorator';
@ApiBasicAuth()
@Controller('carts')
export class CartsController {
  constructor(
    private CartsService: CartsService,
    private readonly authService: AuthService
    ) {}

  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  createCartRecord(@Body() data,@Request() req){ 
    return this.CartsService.create(data, req.user.userId);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCartProduct(@Request() req) {
    return this.CartsService.getAllCartRecord(req.user.userId);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @UseGuards(JwtAuthGuard)
  @Put()
  updateCart(@Body() data:{ type: string }, @Request() req ){
    return this.CartsService.update(data.type, req.user.userId);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  destroyCartRecord(@Param('id') id: string, @Request() req ) {
    return this.CartsService.destroy(id, req.user.userId);
  }
}
