import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountersController } from './counters.controller';
import { CountersService } from './counters.service';
@Module({
  imports: [],
  controllers: [CountersController],
  providers: [CountersService],
  exports:[TypeOrmModule]
})
export class CountersModule {
  
}