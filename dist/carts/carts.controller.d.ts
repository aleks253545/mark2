import { CartsService } from './carts.service';
import { CartsEntity } from './carts.entity';
import CardsDTO from './carts.dto';
export declare class CartsController {
    private LikesService;
    constructor(LikesService: CartsService);
    createCartRecord(data: CardsDTO): Promise<CartsEntity>;
    getAllCartRecord(): any;
    destroyCartRecord(data: {
        noteId: string;
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
