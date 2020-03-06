import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { ProductsDTO } from './products.dto';
import { UsersEntity } from 'src/users/users.entity';
export declare class ProductsService {
    private readonly productsRepository;
    private readonly usersRepository;
    constructor(productsRepository: Repository<ProductsEntity>, usersRepository: Repository<UsersEntity>);
    private readonly logger;
    showProducts(offset: any): Promise<any[]>;
    setCounter(product: any): Promise<any>;
    create(data: ProductsDTO): Promise<ProductsEntity>;
    read(id: string): Promise<ProductsEntity>;
    update(id: string, data: any): Promise<ProductsEntity>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
