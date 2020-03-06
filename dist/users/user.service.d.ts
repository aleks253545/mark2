import { Repository } from 'typeorm';
import { UserEntity } from './User.entity';
import { UserDTO } from './user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    showAll(): Promise<UserEntity[]>;
    create(data: UserDTO): Promise<UserEntity>;
    read(id: string): Promise<UserEntity>;
    update(id: string, data: any): Promise<UserEntity>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
