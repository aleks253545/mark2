import { CountersService } from './counters.service';
export declare class CountersController {
    private readonly CountersService;
    constructor(CountersService: CountersService);
    createNote(data: any): void;
    readNote(id: string): void;
    updateNote(id: string, data: any): Promise<number>;
    destroyNote(id: string): void;
}
