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
const carts_entity_1 = require("../carts/carts.entity");
const products_entity_1 = require("../products/products.entity");
let UsersEntity = class UsersEntity {
};
__decorate([
    typeorm_1.OneToMany(type => products_entity_1.ProductsEntity, product => product.id),
    typeorm_1.OneToMany(type => carts_entity_1.CartsEntity, cart => cart.userId),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        unique: true
    }),
    __metadata("design:type", String)
], UsersEntity.prototype, "login", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
UsersEntity = __decorate([
    typeorm_1.Entity('users')
], UsersEntity);
exports.UsersEntity = UsersEntity;
//# sourceMappingURL=users.entity.js.map