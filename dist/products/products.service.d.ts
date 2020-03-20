import { Repository } from 'typeorm';
import { ProductsEntity } from 'src/products/products.entity';
import { ProductsDTO } from './products.dto';
import { UsersEntity } from 'src/users/users.entity';
export declare var minioClient: any;
export declare class ProductsService {
    private readonly productsRepository;
    private readonly usersRepository;
    constructor(productsRepository: Repository<ProductsEntity>, usersRepository: Repository<UsersEntity>);
    private readonly logger;
    showProducts(offset: number): Promise<any[]>;
    SetAnyParams(product: any, type: any): Promise<any>;
    create(image: any, data: ProductsDTO): Promise<ProductsEntity>;
    read(id: string): Promise<any>;
    update(id: string, data: any, image: any, userId: any): Promise<ProductsEntity>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
