import { LikesEntity } from './likes.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/users/users.entity';
import { NotesEntity } from 'src/notes/notes.entity';
export declare class LikesService {
    private readonly likesRepository;
    private readonly userRepository;
    private readonly notesRepository;
    constructor(likesRepository: Repository<LikesEntity>, userRepository: Repository<UsersEntity>, notesRepository: Repository<NotesEntity>);
    onChangeLike(data: {
        noteId: string;
        userId: string;
    }, type: string): Promise<void>;
    create(data: {
        noteId: string;
        userId: string;
    }): Promise<LikesEntity>;
    read(id: string): Promise<LikesEntity[]>;
    destroy(data: {
        noteId: string;
        userId: string;
    }): Promise<{
        deleted: boolean;
    }>;
}
