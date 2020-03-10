import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { UsersEntity } from 'src/users/users.entity';
export declare const client: any;
export declare class CountersService {
    private readonly productsRepository;
    private readonly usersRepository;
    constructor(productsRepository: Repository<ProductsEntity>, usersRepository: Repository<UsersEntity>);
    private readonly logger;
    update(id: string, data: {
        value: number;
        page: string;
        userId: string;
    }): Promise<number>;
    destroy(data: {
        userdId: string;
        productId: string;
    }): Promise<any>;
}
