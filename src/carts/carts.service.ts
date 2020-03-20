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

    async create(data, userId: string) {
      const record = await this.cartsRepository.find({
        where: {
          userId,
          productId : data.productId
        }
      })
      const porductsCounter = data.counter,
      totalQuantity = +  await  client.get(data.productId.toString());
      if(totalQuantity > porductsCounter || totalQuantity === porductsCounter){
        if( record.length){ 
        const cartCounter = + await  client.hget(userId.toString(), data.productId.toString());
        await client.hset(userId.toString(), data.productId.toString(),(cartCounter + porductsCounter).toString());
        await client.set(data.productId.toString(),(totalQuantity - porductsCounter).toString())
        } else {
          await client.hset(userId.toString(), data.productId.toString(), porductsCounter.toString());
          await client.set(data.productId.toString(),(totalQuantity - porductsCounter).toString()); 
          const card = await this.cartsRepository.create({...data, userId});
          await this.cartsRepository.save(card);
        }
      } else { 
        await client.hset(userId.toString(), data.productId.toString(), totalQuantity.toString());
        await client.set(data.productId.toString(), '0');
      }

     let maxQuantity =  + await client.get(data.productId.toString()),
      cartQuantity =  + await client.hget(userId.toString(), data.productId.toString()); 

      return {
        maxQuantity,
        cartQuantity,
      }
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

    async destroy(productId: string, userId:string ) {
      let cartRec = await this.cartsRepository.findOne({
        where: {
          userId,
          productId : productId
        }
      });
      if( cartRec.userId === userId) {
        let cartCounter = + await client.hget(cartRec.userId, cartRec.productId),
        totalQuantity = + await client.get(cartRec.productId);
              await client.set(cartRec.productId, (cartCounter + totalQuantity).toString());
              await client.hset(cartRec.userId, cartRec.productId, '');
        let cartId = cartRec.cartId;
        await this.cartsRepository.delete({cartId});
        return cartRec.productId
      }
      
      return console.error('incorrect id');
      
    } 

    async update(type:string ,userId:string){
      let prodIds = await this.cartsRepository.find({
        where: {
          userId
        },
        select : ['productId']
      })
      if(type === 'clear') {
        for(let i = 0; i < prodIds.length; i++){
            let cartCounter = + await client.hget(userId.toString(),prodIds[i].productId.toString()),
            totalQuantity = + await client.get(prodIds[i].productId.toString());
            await client.set(prodIds[i].productId.toString(), (cartCounter + totalQuantity).toString());
            await client.hset(userId.toString(),prodIds[i].productId,0);
        } 
      } else if(type === 'buy') {
          await client.del(userId.toString());
      }
      await this.cartsRepository.delete({
        userId: userId
      });
      return  [];
    }
    
}
