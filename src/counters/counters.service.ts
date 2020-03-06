import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createClient, print} from "redis";
import { ProductsEntity } from 'src/products/products.entity';
import { UsersEntity } from 'src/users/users.entity';

const asyncRedis = require("async-redis");
export const client = asyncRedis.createClient();
client.on("error", function (err) {
  console.log("Error " + err);
});

@Injectable()
export class CountersService {
  
  constructor(
    @InjectRepository(ProductsEntity) 
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>
    ) {}
    
    private readonly logger = new Logger(CountersService.name);

    async update( id: string, data:{value:number}) {
      const prodTotalQuantity = + await client.get(id.toString()),
      prodCounter  =  + await  client.hget('products',id.toString());
      if(data.value > 0  &&  data.value < prodTotalQuantity || data.value === prodTotalQuantity){
        await client.hmset('products',id.toString(),data.value.toString());
      }
      return  + await  client.hget('products',id.toString());
    }

    async destroy(data: {userdId: string, productId: string}) {
      return null;
    }
}
