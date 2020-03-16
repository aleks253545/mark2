import { ProductsService } from './products.service';
import { ProductsDTO } from './products.dto';
import { AuthService } from '../auth/auth.service';
export declare class ProductsController {
    private readonly ProductsService;
    private readonly authService;
    constructor(ProductsService: ProductsService, authService: AuthService);
    showAllProducts(offset: string): Promise<any[]>;
    uploadFile(image: any, data: ProductsDTO, req: any): void;
    readNote(id: string): Promise<any>;
    updateProduct(id: string, image: any, data: any, req: any): Promise<import("./products.entity").ProductsEntity>;
}
