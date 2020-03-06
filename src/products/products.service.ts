import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsEntity } from 'src/products/products.entity';
import { ProductsDTO } from './products.dto';
import { UsersEntity } from 'src/users/users.entity';
import { client } from '../counters/counters.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity) 
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>,
    ) {}
    private readonly logger = new Logger(ProductsService.name);

    async showProducts(offset){
      const products = await this.productsRepository.find({
        take:10,
        skip: offset,
      });
      return  Promise.all(products.map(product => this.setCounter(product)))
    }

    async setCounter (product) {
      const totalQuantity =+ await  client.get(product.id.toString());

      if( totalQuantity > 0 ){
        await client.hmset('products',product.id.toString(),'1');
      } else { 
        await client.hmset('products',product.id.toString(),'0');
      }
      product.quantity =  + await  client.hget('products',product.id.toString());
      return product
    }

    async create(data: ProductsDTO) {
      const product = await this.productsRepository.create(data);
      await this.productsRepository.save(product);
      client.set(product.id,data.quantity.toString());
      return product; 
    }

    async read(id: string) {
      return await this.productsRepository.findOne({
        where: {id}
      });
    }
    async update( id: string, data) {
      await this.productsRepository.update({id}, data);
      const note = await this.productsRepository.findOne({id});
      return note;
    }

    async destroy(id: string) {
      await this.productsRepository.delete({id}); 
      return {deleted: true}
    }
}
