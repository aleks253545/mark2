import { UserEntity } from './User.entity';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    showAllusers(): any;
    createUser(data: UserDTO): Promise<UserEntity>;
    readuser(id: string): any;
    updateUser(id: string, data: any): any;
    destroyUser(id: string): any;
}
