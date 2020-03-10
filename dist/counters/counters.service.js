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
var CountersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("../products/products.entity");
const users_entity_1 = require("../users/users.entity");
const asyncRedis = require("async-redis");
exports.client = asyncRedis.createClient();
exports.client.on("error", function (err) {
    console.log("Error " + err);
});
let CountersService = CountersService_1 = class CountersService {
    constructor(productsRepository, usersRepository) {
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(CountersService_1.name);
    }
    async update(id, data) {
        const prodTotalQuantity = +await exports.client.get(id.toString()), prodCounter = +await exports.client.hget('products', id.toString());
        this.logger.debug(prodTotalQuantity);
        if (data.page === 'products') {
            if (data.value > 0 && data.value < prodTotalQuantity || data.value === prodTotalQuantity) {
                await exports.client.hmset('products', id.toString(), data.value.toString());
            }
            else if (data.value > prodTotalQuantity && data.value < prodCounter) {
                await exports.client.hmset('products', id.toString(), data.value.toString());
            }
            return +await exports.client.hget('products', id.toString());
        }
        const cartCounter = +await exports.client.hget(data.userId, id);
        if (data.page === 'cart' && data.value > 0) {
            if (cartCounter > data.value) {
                await exports.client.hmset(data.userId.toString(), id.toString(), data.value.toString());
                await exports.client.set(id.toString(), (prodTotalQuantity + cartCounter - data.value).toString());
                return +await exports.client.hget(data.userId.toString(), id.toString());
            }
            else if (cartCounter < data.value &&
                (data.value - cartCounter) < prodTotalQuantity ||
                (data.value - cartCounter) === prodTotalQuantity) {
                await exports.client.hmset([data.userId.toString(), id.toString(), data.value.toString()]);
                await exports.client.set(id.toString(), (prodTotalQuantity + cartCounter - data.value).toString());
                return +await exports.client.hget(data.userId, id.toString());
            }
            else {
                return cartCounter;
            }
        }
    }
    async destroy(data) {
        return null;
    }
};
CountersService = CountersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(products_entity_1.ProductsEntity)),
    __param(1, typeorm_1.InjectRepository(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CountersService);
exports.CountersService = CountersService;
//# sourceMappingURL=counters.service.js.map