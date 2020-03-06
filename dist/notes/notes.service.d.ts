import { Repository } from 'typeorm';
import { NotesEntity } from 'src/notes/notes.entity';
import { NotesDTO } from './notes.dto';
import { UsersEntity } from 'src/users/users.entity';
export declare class NotesService {
    private readonly notesRepository;
    private readonly usersRepository;
    constructor(notesRepository: Repository<NotesEntity>, usersRepository: Repository<UsersEntity>);
    private readonly logger;
    showAll(): Promise<NotesEntity[]>;
    updateLastNotes(authorId: string): Promise<void>;
    updateUnigeTags(authorId: string, tags: string): Promise<void>;
    create(data: NotesDTO): Promise<NotesEntity>;
    read(id: string): Promise<NotesEntity>;
    update(id: string, data: any): Promise<NotesEntity>;
    destroy(id: string): Promise<{
        deleted: boolean;
    }>;
}
