import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { UsersDTO } from './users.dto';
export declare class UsersController {
    private UserService;
    private readonly authService;
    constructor(UserService: UsersService, authService: AuthService);
    getProfile(req: any): any;
    createUser(data: UsersDTO): Promise<{
        access_token: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
    }>;
}
