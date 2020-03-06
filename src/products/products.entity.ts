import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,JoinColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { CartsEntity } from '../carts/carts.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid') 
  @OneToMany(type => CartsEntity , carts => carts.productId)
  id: string;
  
  @ManyToOne(type => UsersEntity, user => user.id)
  user:string;

  @Column({ nullable: true })
    userId: string;

  @Column({
    type:'text'
  })
  name: string;

  @Column({
    type:'text'
  })
  description: string;


  @Column({
    type:'text',
    nullable: true
  })
  imgPath: string;

}