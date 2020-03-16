import { CountersService } from './counters.service';
import { AuthService } from 'src/auth/auth.service';
export declare class CountersController {
    private readonly CountersService;
    private readonly authService;
    constructor(CountersService: CountersService, authService: AuthService);
    createNote(data: any): void;
    readNote(id: string): void;
    updateNote(id: string, data: any, req: any): Promise<number>;
    destroyNote(id: string): void;
}
