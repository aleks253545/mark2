import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import CardsDTO from './carts.dto';
export declare class CartsService {
    private readonly cartsRepository;
    private readonly notesRepository;
    constructor(cartsRepository: Repository<CartsEntity>, notesRepository: Repository<ProductsEntity>);
    private readonly logger;
    create(data: CardsDTO, userId: string): Promise<number>;
    getAllCartRecord(userId: string): Promise<any[]>;
    SetAnyParams(item: any): Promise<any>;
    destroy(cartId: string, userId: string): Promise<void | any[]>;
    update(type: string, userId: string): Promise<any[]>;
}
