"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const likes_controller_1 = require("./likes.controller");
const likes_service_1 = require("./likes.service");
const likes_entity_1 = require("./likes.entity");
const users_service_1 = require("../users/users.service");
const notes_module_1 = require("../notes/notes.module");
let LikesModule = class LikesModule {
};
LikesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([likes_entity_1.LikesEntity]), notes_module_1.NotesModule],
        controllers: [likes_controller_1.LikesController],
        providers: [likes_service_1.LikesService, users_service_1.UsersService],
        exports: [typeorm_1.TypeOrmModule]
    })
], LikesModule);
exports.LikesModule = LikesModule;
//# sourceMappingURL=likes.module.js.map