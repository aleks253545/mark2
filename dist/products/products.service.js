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
const path = require("path");
const products_entity_1 = require("./products.entity");
const users_entity_1 = require("../users/users.entity");
const counters_service_1 = require("../counters/counters.service");
var fs = require('fs'), Minio = require('minio');
exports.minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});
const metaData = {
    'Content-Type': 'application/octet-stream',
    'X-Amz-Meta-Testing': 1234,
    'example': 5678
};
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
        if (products.length) {
            return Promise.all(products.map(product => this.SetAnyParams(product, 'get')));
        }
    }
    async SetAnyParams(product, type) {
        let imgLink = '';
        if (product.imgPath) {
            exports.minioClient.presignedGetObject('europetrip', product.imgPath, 24 * 60 * 60, function (err, presignedUrl) {
                if (err)
                    return console.log(err);
                imgLink = presignedUrl;
            });
        }
        const totalQuantity = +await counters_service_1.client.get(product.id.toString());
        if (type === 'get') {
            if (totalQuantity > 0) {
                product.quantity = 1;
            }
            else {
                product.quantity = 0;
            }
            product.maxQuantitiy = totalQuantity;
        }
        else if (type === 'edit') {
            product.quantity = +totalQuantity;
        }
        product.imgLink = imgLink;
        return product;
    }
    async create(image, data) {
        const prod = await this.productsRepository.create(data);
        let product = await this.productsRepository.save(prod);
        await counters_service_1.client.set(product.id, data.quantity.toString());
        if (image.length) {
            let pathFile = path.resolve(`uploads/${image[0].filename}`);
            await exports.minioClient.fPutObject('europetrip', image[0].originalname, pathFile, metaData, function (err, etag) {
                if (err)
                    return console.log(err);
                console.log('File uploaded successfully.');
                fs.unlink(pathFile, (err) => {
                    console.log('unlink', err);
                });
            });
        }
        return product;
    }
    async read(id) {
        let product = await this.productsRepository.findOne({
            where: { id }
        });
        return this.SetAnyParams(product, 'edit');
    }
    async update(id, data, image, userId) {
        const user = await this.productsRepository.findOne({ id });
        if (user.userId === userId) {
            await this.productsRepository.update({ id }, {
                name: data.name,
                description: data.description
            });
            await counters_service_1.client.set(id, data.quantity.toString());
            this.logger.debug(image);
            if (image.length) {
                let pathFile = path.resolve(`uploads/${image[0].filename}`);
                await exports.minioClient.fPutObject('europetrip', image[0].originalname, pathFile, metaData, function (err, etag) {
                    if (err)
                        return console.log(err);
                    console.log('File uploaded successfully.');
                });
                await this.productsRepository.update({ id }, {
                    imgPath: data.imgPath
                });
            }
        }
        const product = await this.productsRepository.findOne({ id });
        return product;
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