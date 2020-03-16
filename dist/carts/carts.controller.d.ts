import { CartsService } from './carts.service';
import CardsDTO from './carts.dto';
import { AuthService } from '../auth/auth.service';
export declare class CartsController {
    private CartsService;
    private readonly authService;
    constructor(CartsService: CartsService, authService: AuthService);
    createCartRecord(data: CardsDTO, req: any): Promise<number>;
    getAllCartProduct(req: any): Promise<any[]>;
    updateCart(data: {
        type: string;
    }, req: any): Promise<any[]>;
    destroyCartRecord(id: string, req: any): Promise<void | any[]>;
}
