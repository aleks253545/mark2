import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    showAllProducts(offset: string): Promise<any[]>;
    uploadFile(image: any, data: ProductsDTO): void;
    readNote(id: string): Promise<import("./products.entity").ProductsEntity>;
    updateNote(id: string, data: any): Promise<import("./products.entity").ProductsEntity>;
    destroyNote(id: string): Promise<{
        deleted: boolean;
    }>;
}
