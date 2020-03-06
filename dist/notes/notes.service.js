"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notes_entity_1 = require("./notes.entity");
const users_entity_1 = require("../users/users.entity");
let NotesService = NotesService_1 = class NotesService {
    constructor(notesRepository, usersRepository) {
        this.notesRepository = notesRepository;
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(NotesService_1.name);
    }
    async showAll() {
        return await this.notesRepository.find();
    }
    async updateLastNotes(authorId) {
        const findNotes = await this.notesRepository.find({
            order: {
                datePublictaion: 'ASC'
            },
            where: {
                author: authorId
            },
            select: [
                'id',
            ]
        });
        const user = await this.usersRepository.findOne({
            where: {
                id: authorId
            },
            select: [
                'lastPostCount',
            ]
        });
        const lastNotes = await findNotes.map(note => note['id']);
        await this.usersRepository.update({ id: authorId }, { lastNotes: lastNotes.splice(0, 10), lastPostCount: user['lastPostCount'] + 1 });
    }
    async updateUnigeTags(authorId, tags) {
        const user = await this.usersRepository.findOne({
            where: {
                id: authorId
            },
        });
        const uniqueTags = user.uniqueTags ? user.uniqueTags : [];
        JSON.parse(tags).forEach(tag => {
            if (!uniqueTags.find((elem) => elem === tag)) {
                uniqueTags.push(tag);
            }
        });
        this.usersRepository.update({ id: authorId }, { uniqueTags });
    }
    async create(data) {
        const note = await this.notesRepository.create(data);
        const saveNote = await this.notesRepository.save(note);
        await this.updateLastNotes(note.author);
        await this.updateUnigeTags(note.author, note.tags);
        return saveNote;
    }
    async read(id) {
        return await this.notesRepository.findOne({
            where: { id }
        });
    }
    async update(id, data) {
        await this.notesRepository.update({ id }, data);
        const note = await this.notesRepository.findOne({ id });
        await this.updateUnigeTags(note.author, note.tags);
        return note;
    }
    async destroy(id) {
        const user = await this.notesRepository.findOne({ id });
        await this.notesRepository.delete({ id });
        await this.updateLastNotes(user.author);
        return { deleted: true };
    }
};
NotesService = NotesService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(notes_entity_1.NotesEntity)),
    __param(1, typeorm_1.InjectRepository(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map