import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UsersEntity>);
    private readonly logger;
    create(data: UsersDTO): Promise<UsersEntity>;
    read(id: string): Promise<UsersEntity>;
    readByLog(login: string, password: string): Promise<string>;
    update(id: string, data: any): Promise<UsersEntity>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
