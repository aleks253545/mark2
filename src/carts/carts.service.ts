import { Injectable, Logger } from '@nestjs/common';
import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import CardsDTO from './carts.dto';
import { threadId } from 'worker_threads';
import { client} from '../counters/counters.service';
import {minioClient } from '../products/products.service';
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
    return  Promise.all(cartList.map(item => this.SetAnyParams(item)))
    }

    async SetAnyParams (item) {
      let imgLink;
      if (item.product.imgPath) {
        minioClient.presignedGetObject('europetrip', item.product.imgPath, 24*60*60, function(err, presignedUrl) {
          if (err) return console.log(err)
          imgLink = presignedUrl
        })
      }
      item.product.cartId = item.cartId;
      item.product.quantity =  + await client.hget(item.userId.toString(),item.productId.toString());
      item.product.imgLink = imgLink;
      return await item.product
    }

    async destroy(cartId: string ) {
      let cartRec = await this.cartsRepository.find({cartId});
      let cartCounter = + await client.hget(cartRec[0].userId, cartRec[0].productId),
            totalQuantity = + await client.get(cartRec[0].productId);
            await client.set(cartRec[0].productId, (cartCounter + totalQuantity).toString());
            await client.del(cartRec[0].userId);
    await this.cartsRepository.delete({cartId});
    let products =  await this.cartsRepository.find({
      where: {
        userId: cartRec[0].userId
      }
    })
    return Promise.all(products.map(product => this.SetAnyParams(product)))
    }
    
    async update(data: {userId: string, type: string}){
      let prodIds = await this.cartsRepository.find({
        where: {
          userId: data.userId
        },
        select : ['productId']
      })
      if(data.type === 'clear') {
        for(let i = 0; i < prodIds.length; i++){
            let cartCounter = + await client.hget(data.userId.toString(),prodIds[i].productId.toString()),
            totalQuantity = + await client.get(prodIds[i].productId.toString());
            this.logger.debug(totalQuantity);
            this.logger.debug(cartCounter);
            await client.set(prodIds[i].productId.toString(), (cartCounter + totalQuantity).toString());
            await client.hset(data.userId.toString(),prodIds[i].productId,0);
        } 
      } else if(data.type === 'buy') {
          await client.del(data.userId.toString());
      }
      await this.cartsRepository.delete({
        userId: data.userId
      });
      return  [];
    }
    
}
