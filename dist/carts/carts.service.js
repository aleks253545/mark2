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
var CartsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const carts_entity_1 = require("./carts.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const products_entity_1 = require("../products/products.entity");
const counters_service_1 = require("../counters/counters.service");
const products_service_1 = require("../products/products.service");
let CartsService = CartsService_1 = class CartsService {
    constructor(cartsRepository, notesRepository) {
        this.cartsRepository = cartsRepository;
        this.notesRepository = notesRepository;
        this.logger = new common_1.Logger(CartsService_1.name);
    }
    async create(data) {
        const record = this.cartsRepository.find({
            where: {
                userId: data.userId,
                productId: data.productId
            }
        });
        const porductsCounter = +await counters_service_1.client.hget('products', data.productId.toString()), totalQuantity = +await counters_service_1.client.get(data.productId.toString());
        if (totalQuantity > porductsCounter || totalQuantity === porductsCounter) {
            if ((await record).length) {
                const cartCounter = +await counters_service_1.client.hget(data.userId.toString(), data.productId.toString());
                await counters_service_1.client.hset(data.userId.toString(), data.productId.toString(), (cartCounter + porductsCounter).toString());
                await counters_service_1.client.set(data.productId.toString(), (totalQuantity - porductsCounter).toString());
            }
            else {
                await counters_service_1.client.hset(data.userId.toString(), data.productId.toString(), porductsCounter.toString());
                await counters_service_1.client.set(data.productId.toString(), (totalQuantity - porductsCounter).toString());
                const card = await this.cartsRepository.create(data);
                await this.cartsRepository.save(card);
            }
            if ((totalQuantity - porductsCounter) > 0) {
                await counters_service_1.client.hset('products', data.productId.toString(), '1');
            }
            else {
                await counters_service_1.client.hset('products', data.productId.toString(), '0');
            }
        }
        return +await counters_service_1.client.hget('products', data.productId.toString());
    }
    async getAllCartRecord(userId) {
        let cartList = await this.cartsRepository.find({
            where: {
                userId
            },
            relations: ['product']
        });
        return Promise.all(cartList.map(item => this.setCounter(item)));
    }
    async setCounter(item) {
        let imgLink;
        products_service_1.minioClient.presignedGetObject('europetrip', item.product.imgPath, 24 * 60 * 60, function (err, presignedUrl) {
            if (err)
                return console.log(err);
            imgLink = presignedUrl;
        });
        item.product.cartId = item.cartId;
        item.product.quantity = +await counters_service_1.client.hget(item.userId.toString(), item.productId.toString());
        item.product.imgLink = imgLink;
        return await item.product;
    }
    async destroy(cartId) {
        let cartRec = await this.cartsRepository.find({ cartId });
        let cartCounter = +await counters_service_1.client.hget(cartRec[0].userId, cartRec[0].productId), totalQuantity = +await counters_service_1.client.get(cartRec[0].productId);
        await counters_service_1.client.set(cartRec[0].productId, (cartCounter + totalQuantity).toString());
        await counters_service_1.client.del(cartRec[0].userId);
        await this.cartsRepository.delete({ cartId });
        return await this.cartsRepository.find({
            where: {
                userId: cartRec[0].userId
            }
        });
    }
    async update(data) {
        let prodIds = await this.cartsRepository.find({
            where: {
                userId: data.userId
            },
            select: ['productId']
        });
        if (data.type === 'clear') {
            for (let i = 0; i < prodIds.length; i++) {
                let cartCounter = +await counters_service_1.client.hget(data.userId.toString(), prodIds[i].productId.toString()), totalQuantity = +await counters_service_1.client.get(prodIds[i].productId.toString());
                await counters_service_1.client.set(prodIds[i].productId.toString(), (cartCounter + totalQuantity).toString());
                await counters_service_1.client.del(data.userId.toString());
            }
        }
        else if (data.type === 'buy') {
            await counters_service_1.client.del(data.userId.toString());
        }
        await this.cartsRepository.delete({
            userId: data.userId
        });
        return [];
    }
};
CartsService = CartsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(carts_entity_1.CartsEntity)),
    __param(1, typeorm_2.InjectRepository(products_entity_1.ProductsEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CartsService);
exports.CartsService = CartsService;
//# sourceMappingURL=carts.service.js.map