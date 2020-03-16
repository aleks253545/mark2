import { Controller, Get, Post, Delete, Put, Body, Param, Query, UseInterceptors, UploadedFile, UploadedFiles, Res, UseGuards,Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO} from './products.dto'
import {FilesInterceptor} from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService} from '../auth/auth.service'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly authService: AuthService
    ) {}

  @Get()
  async showAllProducts(@Query('offset') offset: string,) {
    return  await this.ProductsService.showProducts(offset);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('image'))
  uploadFile(@UploadedFiles() image, @Body() data: ProductsDTO,@Request() req) {
    this.ProductsService.create(image, {...data, userId:req.user.userId});
  }

  @Get(':id')
  readNote(@Param('id') id:string) {
    return this.ProductsService.read(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('image'))
  updateProduct(@Param('id') id:string, @UploadedFiles() image, @Body() data, @Request() req) {
    return this.ProductsService.update(id, data, image, req.user.userId);
  }

  // @Delete(':id')
  // destroyNote(@Param('id') id: string) {
  //   return this.ProductsService.destroy(id)
  // }

}
