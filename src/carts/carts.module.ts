import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartsEntity } from './carts.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartsEntity]), ProductsModule],
  controllers: [CartsController],
  providers: [CartsService , UsersService],
  exports:[TypeOrmModule]
})
export class CartsModule {}
