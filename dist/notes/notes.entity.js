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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../users/users.entity");
const likes_entity_1 = require("../likes/likes.entity");
let NotesEntity = class NotesEntity {
};
__decorate([
    typeorm_1.OneToMany(type => likes_entity_1.LikesEntity, likes => likes.noteId),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], NotesEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        nullable: false
    }),
    typeorm_1.ManyToOne(type => users_entity_1.UsersEntity, user => user.id),
    __metadata("design:type", String)
], NotesEntity.prototype, "author", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text'
    }),
    __metadata("design:type", String)
], NotesEntity.prototype, "text", void 0);
__decorate([
    typeorm_1.CreateDateColumn({
        type: 'text',
        nullable: true
    }),
    __metadata("design:type", Date)
], NotesEntity.prototype, "datePublictaion", void 0);
__decorate([
    typeorm_1.Column({
        type: 'simple-json',
        nullable: true
    }),
    __metadata("design:type", String)
], NotesEntity.prototype, "tags", void 0);
__decorate([
    typeorm_1.Column({
        type: 'integer',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Number)
], NotesEntity.prototype, "likes", void 0);
NotesEntity = __decorate([
    typeorm_1.Entity('notes')
], NotesEntity);
exports.NotesEntity = NotesEntity;
//# sourceMappingURL=notes.entity.js.map