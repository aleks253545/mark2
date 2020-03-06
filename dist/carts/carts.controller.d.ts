import { CartsService } from './carts.service';
import { CartsEntity } from './carts.entity';
import CardsDTO from './carts.dto';
export declare class CartsController {
    private CartsService;
    constructor(CartsService: CartsService);
    createCartRecord(data: CardsDTO): Promise<CartsEntity>;
    getAllCartProduct(userId: string): Promise<void>;
    destroyCartRecord(data: {
        noteId: string;
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
