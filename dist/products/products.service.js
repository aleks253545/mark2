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
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const products_entity_1 = require("./products.entity");
const users_entity_1 = require("../users/users.entity");
const counters_service_1 = require("../counters/counters.service");
let ProductsService = ProductsService_1 = class ProductsService {
    constructor(productsRepository, usersRepository) {
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(ProductsService_1.name);
    }
    async showProducts(offset) {
        const products = await this.productsRepository.find({
            take: 10,
            skip: offset,
        });
        return Promise.all(products.map(product => this.setCounter(product)));
    }
    async setCounter(product) {
        const totalQuantity = +await counters_service_1.client.get(product.id.toString());
        if (totalQuantity > 0) {
            await counters_service_1.client.hmset('products', product.id.toString(), '1');
        }
        else {
            await counters_service_1.client.hmset('products', product.id.toString(), '0');
        }
        product.quantity = +await counters_service_1.client.hget('products', product.id.toString());
        return product;
    }
    async create(data) {
        const product = await this.productsRepository.create(data);
        await this.productsRepository.save(product);
        counters_service_1.client.set(product.id, data.quantity.toString());
        return product;
    }
    async read(id) {
        return await this.productsRepository.findOne({
            where: { id }
        });
    }
    async update(id, data) {
        await this.productsRepository.update({ id }, data);
        const note = await this.productsRepository.findOne({ id });
        return note;
    }
    async destroy(id) {
        await this.productsRepository.delete({ id });
        return { deleted: true };
    }
};
ProductsService = ProductsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(products_entity_1.ProductsEntity)),
    __param(1, typeorm_1.InjectRepository(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map