import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersDTO } from './users.dto';
export declare class UsersController {
    private UserService;
    constructor(UserService: UsersService);
    readByLog(login: string, password: string): Promise<string>;
    createUser(data: UsersDTO): Promise<UsersEntity>;
    readuser(id: string): Promise<UsersEntity>;
    updateUser(id: string, data: any): Promise<UsersEntity>;
    destroyUser(id: string): Promise<{
        deleted: boolean;
    }>;
}
