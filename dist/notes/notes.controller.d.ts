import { NotesEntity } from './notes.entity';
import { NotesService } from './notes.service';
import { NotesDTO } from './notes.dto';
export declare class NotesController {
    private readonly NotesService;
    constructor(NotesService: NotesService);
    showAllusers(): Promise<NotesEntity[]>;
    createNote(data: NotesDTO): Promise<NotesEntity>;
    readNote(id: string): Promise<NotesEntity>;
    updateNote(id: string, data: any): Promise<NotesEntity>;
    destroyNote(id: string): Promise<{
        deleted: boolean;
    }>;
}
