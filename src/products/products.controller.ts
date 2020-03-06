import { Controller, Get, Post, Delete, Put, Body, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO} from './products.dto'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly ProductsService: ProductsService
    ) {}
  @Get( )
  async showAllProducts(@Query('offset') offset: string,) {
    return  await this.ProductsService.showProducts(offset);
  }

  @Post()
  createNote(@Body() data: ProductsDTO){  
    return this.ProductsService.create(data);
  }

  @Get(':id')
  readNote(@Param('id') id:string) {
    return this.ProductsService.read(id);
  }
  
  @Put(':id')
  updateNote(@Param('id') id:string, @Body() data) {
    return this.ProductsService.update(id, data)
  }

  @Delete(':id')
  destroyNote(@Param('id') id: string) {
    return this.ProductsService.destroy(id)
  }
}
