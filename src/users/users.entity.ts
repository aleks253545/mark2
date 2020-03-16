import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {CartsEntity} from '../carts/carts.entity';
import { ProductsEntity} from '../products/products.entity';
@Entity('users')
export class UsersEntity {
  @OneToMany(type => ProductsEntity, product => product.id)
  @OneToMany(type => CartsEntity, cart => cart.userId)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'text',
    unique:true  
  })
  username: string;

  @Column('text')
  password: string;

}