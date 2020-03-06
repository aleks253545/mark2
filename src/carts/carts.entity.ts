import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column } from 'typeorm';
import { ProductsEntity } from '../products/products.entity';
import { UsersEntity } from '../users/users.entity';

@Entity('carts')
export class CartsEntity {
  @PrimaryGeneratedColumn('uuid')
  cartId: string 

  @Column({nullable:true})
  productId:string
  
  @ManyToOne(type => ProductsEntity, products => products.id)
  product: string;

  @ManyToOne(type => UsersEntity, user => user.id)
  user: string;

  @Column({nullable:true})
  userId:string
}