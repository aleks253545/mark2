import { LikesService } from './likes.service';
import { LikesEntity } from './likes.entity';
import { UsersService } from 'src/users/users.service';
export declare class LikesController {
    private LikesService;
    private UsersService;
    constructor(LikesService: LikesService, UsersService: UsersService);
    createLike(data: {
        noteId: string;
        userId: string;
    }): Promise<LikesEntity>;
    getAllLikePost(id: string): Promise<LikesEntity[]>;
    destroyLike(data: {
        noteId: string;
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
