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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const likes_entity_1 = require("./likes.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/users.entity");
const notes_entity_1 = require("../notes/notes.entity");
let LikesService = class LikesService {
    constructor(likesRepository, userRepository, notesRepository) {
        this.likesRepository = likesRepository;
        this.userRepository = userRepository;
        this.notesRepository = notesRepository;
    }
    async onChangeLike(data, type) {
        const note = await this.notesRepository.findOne({
            where: {
                id: data.noteId
            },
            select: ['likes']
        }), user = await this.userRepository.findOne({
            where: {
                id: data.userId
            },
            select: ['totalCountLikes', 'lastLikeCount']
        });
        if (type === 'add') {
            await this.notesRepository.update({ id: data.noteId }, { likes: note['likes'] + 1 });
            await this.userRepository.update({ id: data.userId }, {
                totalCountLikes: user['totalCountLikes'] + 1,
                lastLikeCount: user['lastLikeCount'] + 1
            });
        }
        else if (type === 'delete') {
            await this.notesRepository.update({ id: data.noteId }, { likes: note['likes'] - 1 });
            await this.userRepository.update({ id: data.userId }, {
                totalCountLikes: user['totalCountLikes'] - 1,
                lastLikeCount: user['lastLikeCount'] - 1
            });
        }
    }
    async create(data) {
        const like = await this.likesRepository.create(data);
        await this.likesRepository.save(like);
        await this.onChangeLike(data, 'add');
        return like;
    }
    async read(id) {
        return await this.likesRepository.find({
            where: {
                noteId: id,
            }
        });
    }
    async destroy(data) {
        await this.likesRepository.delete({
            userId: data.userId,
            noteId: data.noteId
        });
        await this.onChangeLike(data, 'delete');
        return { deleted: true };
    }
};
LikesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(likes_entity_1.LikesEntity)),
    __param(1, typeorm_2.InjectRepository(users_entity_1.UsersEntity)),
    __param(2, typeorm_2.InjectRepository(notes_entity_1.NotesEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=likes.service.js.map