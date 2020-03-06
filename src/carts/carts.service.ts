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

    async create(data: CardsDTO): Promise<CartsEntity> {
      const record = this.cartsRepository.find({
        where: {
          userId: data.userId,
          productId : data.productId
        }
      })
      const porductsCounter =  await + client.hget('products',data.productId),
      totalQuantity =  await + client.get(data.productId.toString());
      if(record){ 
        const cartCounter = await + client.hget(data.userId.toString(), data.productId.toString());
        await client.hset(
          data.userId.toString(),
          data.productId.toString(),
          (cartCounter + porductsCounter).toString()
        )
        await client.get(data.productId,(totalQuantity - porductsCounter).toString())
      } else {
        await client.hset(data.userId.toString(), data.productId.toString(), porductsCounter.toString());
        await client.hset(data.productId,(totalQuantity - porductsCounter).toString());  
      }

      if(totalQuantity - porductsCounter > 0){
        await client.hset('products',data.productId,'1');
      } else {
        await client.hset('products',data.productId,'0');
      }
      
      const card = await this.cartsRepository.create(data);
      return await this.cartsRepository.save(card);
      
    }

    async read(id: string) {
      return await this.cartsRepository.find({
        where: {
          noteId: id,
        }
      });
    }
    async destroy(data:{userId: string}) {
      await this.cartsRepository.delete({
        userId:data.userId
      });
      return {deleted: true}
    }
}
