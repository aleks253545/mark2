import { Injectable, Logger } from '@nestjs/common';
import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import CardsDTO from './carts.dto';
import { threadId } from 'worker_threads';
import { client} from '../counters/counters.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartsEntity) 
    private readonly cartsRepository: Repository<CartsEntity>,
    @InjectRepository(ProductsEntity) 
    private readonly notesRepository: Repository<ProductsEntity>,
  ) {}

    private readonly logger = new Logger(CartsService.name);

    async create(data: CardsDTO) {
      this.logger.debug(data);
      const record = this.cartsRepository.find({
        where: {
          userId: data.userId,
          productId : data.productId
        }
      })
      const porductsCounter = + await  client.hget('products',data.productId.toString()),
      totalQuantity = +  await  client.get(data.productId.toString());
      if(totalQuantity > porductsCounter || totalQuantity === porductsCounter){
        if((await record).length){ 
        const cartCounter = + await  client.hget(data.userId.toString(), data.productId.toString());
        this.logger.debug(1);
        await client.hset(data.userId.toString(), data.productId.toString(),(cartCounter + porductsCounter).toString());
        await client.set(data.productId.toString(),(totalQuantity - porductsCounter).toString())
        } else {
          await client.hset(data.userId.toString(), data.productId.toString(), porductsCounter.toString());
          await client.set(data.productId.toString(),(totalQuantity - porductsCounter).toString()); 
          const card = await this.cartsRepository.create(data);
          await this.cartsRepository.save(card);
        }
        if((totalQuantity - porductsCounter) > 0){
          await client.hset('products',data.productId.toString(),'1');
        } else {
          await client.hset('products',data.productId.toString(),'0');
        }
      }
      return   + await client.hget('products',data.productId.toString());
      
    }

    async getAllCartRecord(userId: string) {
      let cartList =  await this.cartsRepository.find({
        where: {
          userId
        },
        relations:['product']
      }); 
      this.logger.debug(cartList);
    return  Promise.all(cartList.map(item => this.setCounter(item)))
    }

    async setCounter (item) {
      item.product.quantity =  + await client.hget(item.userId.toString(),item.productId.toString());
      return await item.product
    }
    async destroy(data:{userId: string}) {
      await this.cartsRepository.delete({
        userId:data.userId
      });
      return {deleted: true}
    }
}
