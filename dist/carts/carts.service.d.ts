import { CartsEntity } from './carts.entity';
import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
export declare class CartsService {
    private readonly cartsRepository;
    private readonly notesRepository;
    constructor(cartsRepository: Repository<CartsEntity>, notesRepository: Repository<ProductsEntity>);
    private readonly logger;
    create(data: any, userId: string): Promise<{
        maxQuantity: number;
        cartQuantity: number;
    }>;
    getAllCartRecord(userId: string): Promise<any[]>;
    SetAnyParams(item: any): Promise<any>;
    destroy(cartId: string, userId: string): Promise<string | void>;
    update(type: string, userId: string): Promise<any[]>;
}
