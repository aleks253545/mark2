import { Controller, Get, Post, Delete, Put, Body, Param, Query, UseInterceptors, UploadedFile, UploadedFiles, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO} from './products.dto'
import {FilesInterceptor} from '@nestjs/platform-express';

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
  @UseInterceptors(FilesInterceptor('image'))
  uploadFile(@UploadedFiles() image, @Body() data: ProductsDTO) {
    this.ProductsService.create(image, data);
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
