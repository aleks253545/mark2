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
const carts_controller_1 = require("./carts.controller");
const carts_service_1 = require("./carts.service");
const carts_entity_1 = require("./carts.entity");
const users_service_1 = require("../users/users.service");
const products_module_1 = require("../products/products.module");
let CartsModule = class CartsModule {
};
CartsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([carts_entity_1.CartsEntity]), products_module_1.ProductsModule],
        controllers: [carts_controller_1.CartsController],
        providers: [carts_service_1.CartsService, users_service_1.UsersService],
        exports: [typeorm_1.TypeOrmModule]
    })
], CartsModule);
exports.CartsModule = CartsModule;
//# sourceMappingURL=carts.module.js.map