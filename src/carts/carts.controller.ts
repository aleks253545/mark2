
import { Controller, Get, Post, Delete, Put, Body, Param, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsEntity} from './carts.entity';
import CardsDTO from './carts.dto'
@Controller('carts')
export class CartsController {
  constructor(
    private CartsService: CartsService
    ) {}

  @Post()
  createCartRecord(@Body() data: CardsDTO){ 
    return this.CartsService.create(data);
  }

  @Get()
  getAllCartProduct(@Query('userId') userId: string) {
    return this.CartsService.getAllCartRecord(userId);
  }


  @Put()
  updateCart(@Body() data:{userId: string, type: string } ){
    return this.CartsService.update(data);
  }

  @Delete(':id')
  destroyCartRecord(@Param('id') id: string ) {
    return this.CartsService.destroy(id);
  }
}
