import { AppUserService } from './appUser.service';
export declare class AppUserController {
    private userSevice;
    constructor(userSevice: AppUserService);
    showAllNotes(): void;
    createNote(): void;
    readNotes(): void;
    updateNotes(): void;
    destroyNote(): void;
}
