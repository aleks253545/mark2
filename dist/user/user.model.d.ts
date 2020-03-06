export declare class User {
    id: number;
    name: string;
    dateOfBirth: string;
    mail: string;
    phone: string;
    notes: any[];
    rateLike: number;
    rateLikeLastNotes: number;
    rateActivite: number;
    uniqeTags: string[];
    constructor(id: number, name: string, dateOfBirth: string, mail: string, phone: string, notes: any[], rateLike: number, rateLikeLastNotes: number, rateActivite: number, uniqeTags: string[]);
}
