import { UserEntity } from './User.entity';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    showAllusers(): Promise<UserEntity[]>;
    createUser(data: UserDTO): Promise<UserEntity>;
    readuser(id: string): Promise<UserEntity>;
    updateUser(id: string, data: any): Promise<UserEntity>;
    destroyUser(id: string): Promise<{
        deleted: boolean;
    }>;
}
