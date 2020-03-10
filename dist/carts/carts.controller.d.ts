import { CartsService } from './carts.service';
import CardsDTO from './carts.dto';
export declare class CartsController {
    private CartsService;
    constructor(CartsService: CartsService);
    createCartRecord(data: CardsDTO): Promise<number>;
    getAllCartProduct(userId: string): Promise<any[]>;
    destroyCartRecord(data: {
        noteId: string;
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
