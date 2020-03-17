import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
const bcrypt = require('bcrypt');
const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) 
    private readonly userRepository: Repository<UsersEntity>,
    ) {}

    private readonly logger = new Logger(UsersService.name)

    async create(data: UsersDTO):Promise<UsersEntity> {
      const hashPassword = bcrypt.hashSync(data.password, saltRounds);
      const user = await this.userRepository.create({...data, password: hashPassword});
      await this.userRepository.save(user);
      return user; 
    }

    async read(id: string) {
      return await this.userRepository.findOne({
        where: {id}
      });
    }

    // async update(id: string, data) {
    //   await this.userRepository.update({id}, data);
    //   return await this.userRepository.findOne({id});
    // }

    // async destroy(id: string) {
    //   await this.userRepository.delete({id});
    //   return {deleted: true}
    // }
}
