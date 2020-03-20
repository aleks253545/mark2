import { Controller, Get, Post, Delete, Put, Body, Param, Query, UseInterceptors, UploadedFile, UploadedFiles, Res, UseGuards,Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO} from './products.dto'
import {FilesInterceptor} from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthService} from '../auth/auth.service'
import { ApiBasicAuth } from '@nestjs/swagger/dist/decorators/api-basic.decorator';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ApiHeader } from '@nestjs/swagger/dist/decorators/api-header.decorator';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly authService: AuthService
    ) {}

  @Get()
  async showAllProducts(@Query('offset') offset: number,) {
    return  await this.ProductsService.showProducts(offset);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @ApiBasicAuth()
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
  
  @ApiHeader({
    name: 'Authorization',
    description: 'user jwt token',
  })
  @ApiBasicAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('image'))
  updateProduct(@Param('id') id:string, @UploadedFiles() image, @Body() data:ProductsDTO, @Request() req) {
    return this.ProductsService.update(id, data, image, req.user.userId);
  }

  // @Delete(':id')
  // destroyNote(@Param('id') id: string) {
  //   return this.ProductsService.destroy(id)
  // }

}
