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

    async update( id: string, data:{value:number, page: string, userId: string}) {
      const prodTotalQuantity = + await client.get(id.toString()),
      prodCounter  =  + await  client.hget('products',id.toString());
      if(data.page === 'products'){
        if(data.value > 0  &&  data.value < prodTotalQuantity || data.value === prodTotalQuantity){
          await client.hmset('products',id.toString(),data.value.toString());
        }else if(data.value > prodTotalQuantity && data.value < prodCounter) {
          await client.hmset('products',id.toString(),data.value.toString());
        }
        return  + await  client.hget('products',id.toString());
      }
      const cartCounter = + await client.hget(data.userId,id);
      if(data.page === 'cart' && data.value > 0 ) {
        if( cartCounter > data.value ){
          await client.hmset(data.userId.toString(),id.toString(),data.value.toString());
          await client.set(id.toString(),(prodTotalQuantity + cartCounter - data.value).toString());
          return + await client.hget(data.userId.toString(),id.toString());
        } else if(
          cartCounter < data.value && 
          (data.value - cartCounter) < prodTotalQuantity || 
          (data.value - cartCounter) === prodTotalQuantity 
          ) {
            await client.hmset([data.userId.toString(), id.toString(), data.value.toString()]);
            await client.set(id.toString(),(prodTotalQuantity + cartCounter - data.value).toString());
            return + await client.hget(data.userId, id.toString());
        }else { 
          return cartCounter;
        }
      }else { 
        return cartCounter;
      }

    }

    async destroy(data: {userdId: string, productId: string}) {
      return null;
    }
}
