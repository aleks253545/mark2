import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';
import { CartsController } from './carts/carts.controller';
import { CartsService } from './carts/carts.service';
import { CartsModule } from './carts/carts.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CountersController } from './counters/counters.controller';
import { CountersService } from './counters/counters.service';
import { CountersModule} from './counters/products.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'aleks1998',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CartsModule,
    ScheduleModule.forRoot()
  ],
  controllers: [ProductsController, CartsController, UsersController,CountersController],
  providers: [ProductsService, CartsService, UsersService,CountersService],
})
export class AppModule {
}
