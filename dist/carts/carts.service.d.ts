import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import CardsDTO from './carts.dto';
export declare class CartsService {
    private readonly cartsRepository;
    private readonly notesRepository;
    constructor(cartsRepository: Repository<CartsEntity>, notesRepository: Repository<ProductsEntity>);
    private readonly logger;
    create(data: CardsDTO): Promise<number>;
    getAllCartRecord(userId: string): Promise<any[]>;
    SetAnyParams(item: any): Promise<any>;
    destroy(cartId: string): Promise<any[]>;
    update(data: {
        userId: string;
        type: string;
    }): Promise<any[]>;
}
