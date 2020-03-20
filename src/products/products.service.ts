import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import { ProductsEntity } from 'src/products/products.entity';
import { ProductsDTO } from './products.dto';
import { UsersEntity } from 'src/users/users.entity';
import { client } from '../counters/counters.service';
import { Cron } from '@nestjs/schedule';
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
const metaData = {
  'Content-Type': 'application/octet-stream',
  'X-Amz-Meta-Testing': 1234,
  'example': 5678
}
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity) 
    private readonly productsRepository: Repository<ProductsEntity>,
    @InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>,
    ) {}
    private readonly logger = new Logger(ProductsService.name);

    async showProducts(offset: number){
      const products = await this.productsRepository.find({
        take:10,
        skip: offset,
      });
      if(products.length){
        return  Promise.all(products.map(product => this.SetAnyParams(product,'get')))
      }
      
    }

    async SetAnyParams (product,type) {
      let imgLink ='';
      if (product.imgPath) {
        minioClient.presignedGetObject('europetrip', product.imgPath, 24*60*60, function(err, presignedUrl) {
          if (err) return console.log(err)
          imgLink = presignedUrl
        })
      }
      const totalQuantity = + await  client.get(product.id.toString());
      if( type === 'get') {
        if( totalQuantity > 0 ){
          product.quantity =  1;
        } else { 
          product.quantity =  0;
        }
        product.maxQuantitiy = totalQuantity;
      } else if (type === 'edit') {
        product.quantity =  + totalQuantity;
      }
      product.imgLink = imgLink;
      return product;
    }

    async create(image, data: ProductsDTO) {
      const prod = await this.productsRepository.create(data);
      let product = await this.productsRepository.save(prod);
      await client.set(product.id, data.quantity.toString());
      if(image.length){
        let pathFile = path.resolve(`uploads/${image[0].filename}`);
        await minioClient.fPutObject('europetrip', image[0].originalname, pathFile, metaData, function(err, etag) {
          if (err) return console.log(err)
          console.log('File uploaded successfully.');
          fs.unlink(pathFile, (err)=>{
            console.log('unlink', err);
          });
        });
      } 
        return product   
    }


    async read(id: string) {
      let product = await this.productsRepository.findOne({
        where: {id}
      });
      return this.SetAnyParams(product,'edit');
    }


    async update( id: string, data, image, userId) {
      const user = await this.productsRepository.findOne({id});
      if( user.userId === userId){
        await this.productsRepository.update({id}, {
          name: data.name,
          description: data.description
        });
        await client.set(id,data.quantity.toString());
        this.logger.debug(image);
        if(image.length) {
          let pathFile = path.resolve(`uploads/${image[0].filename}`);
          await minioClient.fPutObject('europetrip', image[0].originalname, pathFile, metaData, function(err, etag) {
            if (err) return console.log(err)
            console.log('File uploaded successfully.')
          });
          await this.productsRepository.update({id}, {
            imgPath: data.imgPath
          });
        }
      }
      const product = await this.productsRepository.findOne({id});
      return product;
    }

    async destroy(id: string) {
      await this.productsRepository.delete({id}); 
      return {deleted: true}
    }
}
