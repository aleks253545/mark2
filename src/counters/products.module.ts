import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountersController } from './counters.controller';
import { CountersService } from './counters.service';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [CountersController],
  providers: [CountersService],
  exports:[TypeOrmModule]
})
export class CountersModule {
  
}