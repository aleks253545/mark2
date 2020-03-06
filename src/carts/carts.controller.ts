
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
  createCartRecord(@Body() data: CardsDTO): Promise<CartsEntity>{ 
    return this.CartsService.create(data);
  }

  @Get()
  getAllCartProduct(@Query('userId') userId: string) {
    return this.CartsService.getAllCartRecord(userId);
  }


  
  @Delete()
  destroyCartRecord(@Body() data:{noteId:string, userId:string }) {
    const like = this.CartsService.destroy(data);
    return like;
  }

}
