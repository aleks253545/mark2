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
    setCounter(item: any): Promise<any>;
    destroy(data: {
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
