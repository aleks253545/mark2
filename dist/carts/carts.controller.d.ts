import { CartsService } from './carts.service';
import { CartsEntity } from './carts.entity';
import CardsDTO from './carts.dto';
export declare class CartsController {
    private CartsService;
    constructor(CartsService: CartsService);
    createCartRecord(data: CardsDTO): Promise<number>;
    getAllCartProduct(userId: string): Promise<any[]>;
    updateCart(data: {
        userId: string;
        type: string;
    }): Promise<any[]>;
    destroyCartRecord(id: string): Promise<CartsEntity[]>;
}
