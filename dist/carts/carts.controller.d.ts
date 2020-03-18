import { CartsService } from './carts.service';
import { AuthService } from '../auth/auth.service';
export declare class CartsController {
    private CartsService;
    private readonly authService;
    constructor(CartsService: CartsService, authService: AuthService);
    createCartRecord(data: any, req: any): Promise<{
        maxQuantity: number;
        cartQuantity: number;
    }>;
    getAllCartProduct(req: any): Promise<any[]>;
    updateCart(data: {
        type: string;
    }, req: any): Promise<any[]>;
    destroyCartRecord(id: string, req: any): Promise<string | void>;
}
