import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/users.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly jwtService;
    private readonly usersRepository;
    constructor(jwtService: JwtService, usersRepository: Repository<UsersEntity>);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
