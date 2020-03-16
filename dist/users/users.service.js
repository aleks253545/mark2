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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const users_entity_1 = require("./users.entity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(data) {
        const hashPassword = bcrypt.hashSync(data.password, saltRounds);
        const user = await this.userRepository.create(Object.assign(Object.assign({}, data), { password: hashPassword }));
        await this.userRepository.save(user);
        return user;
    }
    async read(id) {
        return await this.userRepository.findOne({
            where: { id }
        });
    }
};
UsersService = UsersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map