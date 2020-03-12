import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import { ProductsEntity } from 'src/products/products.entity';
import { ProductsDTO } from './products.dto';
import { UsersEntity } from 'src/users/users.entity';
import { client } from '../counters/counters.service';
import { fstat } from 'fs';
var fs = require('fs'),
 Minio = require('minio');
export var minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
});
let file = '/README.md';
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
      if(products.length){
        return  Promise.all(products.map(product => this.setCounter(product)))
      }
      
    }

    async setCounter (product) {
      const totalQuantity = + await  client.get(product.id.toString());
      let imgLink ;
      minioClient.presignedGetObject('europetrip', product.imgPath, 24*60*60, function(err, presignedUrl) {
        if (err) return console.log(err)
        imgLink = presignedUrl
      })
      if( totalQuantity > 0 ){
        await client.hmset('products',product.id.toString(),'1');
      } else { 
        await client.hmset('products',product.id.toString(),'0');
      }
      product.quantity =  + await  client.hget('products',product.id.toString());
      product.imgLink = imgLink;
      return product;
    }

    async create(image, data: ProductsDTO) {
      const prod = await this.productsRepository.create(data);
      let product = await this.productsRepository.save(prod);
      this.logger.debug(product);
      client.set(product.id, data.quantity.toString());
      let pathFile = path.resolve(`uploads/${image[0].filename}`);
        var metaData = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }
       await minioClient.fPutObject('europetrip', image[0].originalname, pathFile, metaData, function(err, etag) {
          if (err) return console.log(err)
          console.log('File uploaded successfully.')
        });  
        return product   
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
