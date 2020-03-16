import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UsersDTO } from './users.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UsersEntity>);
    private readonly logger;
    create(data: UsersDTO): Promise<UsersEntity>;
    read(id: string): Promise<UsersEntity>;
}
