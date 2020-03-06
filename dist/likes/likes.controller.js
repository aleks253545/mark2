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
const likes_service_1 = require("./likes.service");
const users_service_1 = require("../users/users.service");
let LikesController = class LikesController {
    constructor(LikesService, UsersService) {
        this.LikesService = LikesService;
        this.UsersService = UsersService;
    }
    createLike(data) {
        const like = this.LikesService.create(data);
        return like;
    }
    getAllLikePost(id) {
        return this.LikesService.read(id);
    }
    destroyLike(data) {
        const like = this.LikesService.destroy(data);
        return like;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "createLike", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "getAllLikePost", null);
__decorate([
    common_1.Delete(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LikesController.prototype, "destroyLike", null);
LikesController = __decorate([
    common_1.Controller('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService,
        users_service_1.UsersService])
], LikesController);
exports.LikesController = LikesController;
//# sourceMappingURL=likes.controller.js.map