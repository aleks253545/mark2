import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsEntity } from './products.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]), UsersModule, AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[TypeOrmModule,UsersModule]
})
export class ProductsModule {
  
}
